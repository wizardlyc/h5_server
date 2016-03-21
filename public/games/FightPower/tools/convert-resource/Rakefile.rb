#!/usr/bin/env rake
require 'net/ftp'
require 'json'
require 'pathname'
require 'Digest'


$is_debuging = true

def debug_log(arguments)
	if $is_debuging then
		puts arguments
	end
end
def read_json(file_name)
  temp_file=open(file_name)
  json=temp_file.read
  temp_file.close
  
  parsed=JSON.parse json.force_encoding('UTF-8')
  return parsed
end
def write_back_to_file(file_name,content)
  temp_file=open(file_name,"wb")
  temp_file.write(content)
  temp_file.close
end

$target_name="FightPower"
if !ARGV[0].nil?
  $target_name=ARGV[0]
end
$base_dir = "/Users/workspace/h5_server/public/games/FightPower/tools/convert-resource"
debug_log "Base dir: " + $base_dir

$origin_dir = $base_dir + "/../../res/programmer"

#cocosstudio dir
$css_origin_dir = $base_dir + "/../../../heroes_res/planner/heroes_studio"
#share config json config
$config_origin_dir = $base_dir + "/../../src/shares"
#output dir
$dst_resource_dir = $base_dir + "/../../../#{$target_name}/res"

$manifest=read_json("#{$base_dir}/project.manifest")

desc "Convert all the resource we need."

task :default => [
  :copy_shader_vsh,
  :copy_shader_fsh,
  :copy_unpack_images,
  :copy_tiled_maps,
  :copy_tps_png,
  :copy_font_png,
  :copy_font_fnt,
  :copy_tps_plist,
  :copy_spine_json,
  :copy_spine_png,
  :copy_spine_atlas,
  :copy_css_csb,
  :copy_all_ui_images,
  :copy_musics,
  :copy_plist,
  :copy_plist_png,
  :update_resource_file]

def create_file_dependes(task_name, orig_path, orig_suffix, dst_path, dst_suffix, convert_fun)
	orig_list = FileList["#{orig_path}/*.#{orig_suffix}"];
  
	dst_suffix_array = dst_suffix.instance_of?(Array) ? dst_suffix : [dst_suffix]

	need_list = []

	dst_suffix_array.each do |need_file_suffix|
		need_list += orig_list.map do |file|
			pn = Pathname.new(file)
			converted_name = "#{dst_path}/#{pn.basename(pn.extname())}.#{need_file_suffix}"

			file converted_name => file do |t|        
				convert_fun.call(pn, t.name)
			end

			converted_name
		end
	end


  # debug_log("#{task_name} need list: #{need_list}");
	task task_name => need_list do
		puts "Begin #{task_name}"

		puts "End #{task_name}"
	end
end

def create_copy_dependes(task_name, orig_path, orig_suffix, dst_path)
	create_file_dependes(task_name, orig_path, orig_suffix, dst_path, orig_suffix, lambda { |source, dst|
    sh "cp #{source} #{dst}"
    # target_dir=$base_dir + "/../../../#{$target_name}
#     key_in_manifest=dst.sub("#{$target_dir}","")
#     $manifest["assets"][key_in_manifest]=Digest::MD5.hexdigest(File.read(source))
	})
end

desc "Update resource.js"
task :update_resource_file do
  res_file_path="/Users/workspace/#{$target_name}/src/resource.js"
  res="var res = {"

  config_files = FileList["#{$config_origin_dir}/*.json"]
  files=FileList["#{$dst_resource_dir}/*"]
  
  append_files_to_resource(files,res,false)
  append_configfiles_to_resource(config_files,res,false)
  
  res[res.size-1]=""
  res<<"\n"
  res<<"};\n"
  
  res<<"var g_resources=[];\n"
  res<<"for(var i in res){\n"
  res<<"g_resources.push(res[i]);\n}"
  write_back_to_file(res_file_path,res)
  
  #update file manifest
  write_back_to_file("#{$base_dir}/project.manifest",JSON.generate($manifest))
end

def append_files_to_resource(file_names,resource_js,is_g_resource)
  is_put_tip=false
  file_names.each do |file,index|
    suffix=File.extname(file).sub(".","")
    name_with_out_suffix=File.basename(file,suffix)
    name_with_out_suffix[name_with_out_suffix.size-1]=""
    newname_with_out_suffix=name_with_out_suffix.gsub("-","_")
    # name_with_out_suffix.each_char {|c| 
    #   if(c=='-')
    #     c='_'
    #   end

    #   print c, '' }
    if !is_put_tip
      resource_js<<"\n//////////////////////#{suffix} files files"
      is_put_tip=true
    end
    
    resource_js<<"\n"
    if !is_g_resource
      resource_js<<"#{newname_with_out_suffix}_#{suffix}:\"res/#{name_with_out_suffix}.#{suffix}\","
    elsif
      resource_js<<"res.#{newname_with_out_suffix}_#{suffix},"
    end
  end
end

def append_configfiles_to_resource(file_names,resource_js,is_g_resource)
  is_put_tip=false
  file_names.each do |file,index|
    suffix=File.extname(file).sub(".","")
    name_with_out_suffix=File.basename(file,suffix)
    name_with_out_suffix[name_with_out_suffix.size-1]=""
    newname_with_out_suffix=name_with_out_suffix.gsub("-","_")
    # name_with_out_suffix.each_char {|c| 
    #   if(c=='-')
    #     c='_'
    #   end

    #   print c, '' }
    if !is_put_tip
      resource_js<<"\n//////////////////////#{suffix} files files"
      is_put_tip=true
    end
    
    resource_js<<"\n"
    if !is_g_resource
      resource_js<<"#{newname_with_out_suffix}_#{suffix}:\"src/shares/#{name_with_out_suffix}.#{suffix}\","
    elsif
      resource_js<<"res.#{newname_with_out_suffix}_#{suffix},"
    end
  end
end

#######################################
#convert csb
#######################################
create_copy_dependes(:copy_css_csb,"#{$css_origin_dir}/res","json",$dst_resource_dir)
create_copy_dependes(:copy_css_jpg,"#{$css_origin_dir}/res","plist",$dst_resource_dir)
# create_copy_dependes(:copy_css_png,"#{$css_origin_dir}/res","png",$dst_resource_dir)

#######################################
#convert unpack images
#######################################
create_copy_dependes(:copy_unpack_images,"#{$origin_dir}/unpack_images","png",$dst_resource_dir)
create_copy_dependes(:copy_unpack_images,"#{$origin_dir}/unpack_images","jpg",$dst_resource_dir)
#######################################
#convert tiled maps
#######################################
create_copy_dependes(:copy_tiled_maps,"#{$origin_dir}/tiled_map","tmx",$dst_resource_dir)

#######################################
#convert packed images
#######################################
create_copy_dependes(:copy_tps_png,"#{$origin_dir}/tps_output","png",$dst_resource_dir)
create_copy_dependes(:copy_tps_plist,"#{$origin_dir}/tps_output","plist",$dst_resource_dir)

#######################################
#copy particles
#######################################
create_copy_dependes(:copy_plist,"#{$origin_dir}/plist","plist",$dst_resource_dir)
create_copy_dependes(:copy_plist_png,"#{$origin_dir}/plist","png",$dst_resource_dir)

#######################################
#copy fonts
#######################################
create_copy_dependes(:copy_font_png,"#{$origin_dir}/fonts","fnt",$dst_resource_dir)
create_copy_dependes(:copy_font_fnt,"#{$origin_dir}/fonts","png",$dst_resource_dir)

#######################################
#copy shaders
#######################################
create_copy_dependes(:copy_shader_vsh,"#{$origin_dir}/plist","vsh",$dst_resource_dir)
create_copy_dependes(:copy_shader_fsh,"#{$origin_dir}/plist","fsh",$dst_resource_dir)

#######################################
#convert output spines
#######################################
create_copy_dependes(:copy_spine_json,"#{$origin_dir}/spine_output","json",$dst_resource_dir)
create_copy_dependes(:copy_spine_png,"#{$origin_dir}/spine_output","png",$dst_resource_dir)
create_copy_dependes(:copy_spine_atlas,"#{$origin_dir}/spine_output","atlas",$dst_resource_dir)

#######################################
#copy music
#######################################
create_copy_dependes(:copy_musics,"#{$origin_dir}/music","mp3",$dst_resource_dir)
create_copy_dependes(:copy_musics,"#{$origin_dir}/music","wav",$dst_resource_dir)

#TODO::this task is just for demo game,delete this when images are packed.
$copy_unpack_tps_image_tasks=[]
def define_demo_game_task
  tps_path="#{$origin_dir}/tps"
  Dir.foreach(tps_path) do |dir,index|
    path="#{tps_path}/#{dir}"
    task_name=":copy_tps_#{dir}_images"
    if !File.directory?(path)
      next
    end
    debug_log("dir:#{path}")
    create_copy_dependes(task_name,"#{tps_path}/#{dir}","png",$dst_resource_dir)
    create_copy_dependes("#{task_name}_jpg","#{tps_path}/#{dir}","jpg",$dst_resource_dir)
    $copy_unpack_tps_image_tasks<<task_name
    $copy_unpack_tps_image_tasks<<"#{task_name}_jpg"
  end
  debug_log($copy_unpack_tps_image_tasks)
end
define_demo_game_task()
task:copy_all_ui_images=>$copy_unpack_tps_image_tasks

 
