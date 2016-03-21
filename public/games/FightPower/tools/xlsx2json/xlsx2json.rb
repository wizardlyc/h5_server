#!/usr/bin/env ruby

require 'rubyXL'
require 'json'
require "Digest"


def mac?
  !(RUBY_PLATFORM =~ /darwin/).nil?
end

#config_path = '../../src/shares/'
config_path = '../../assets/json/'

if !mac?
  config_path="exports/"
end

#workbook = RubyXL::Parser.parse("../../doc/config/config.xlsx")
workbook = RubyXL::Parser.parse("config.xlsx")
$manifest_file="../convert-resource/project.manifest"

puts 'workbook worksheets size:' + workbook.worksheets.size.to_s
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

def parse(output_obj, sheet_data)
	sheet_first_head = sheet_data[0][0]

  if sheet_first_head.end_with?('{}') 
		puts sheet_first_head + ' is a object.'

		for row in 1..sheet_data.size-1
			obj_name = sheet_data[row][0]
			json_obj = {}

			if obj_name == "{}"
				json_obj = output_obj
			elsif output_obj[obj_name] == nil
				output_obj[obj_name] = {}
        json_obj = output_obj[obj_name]
			end

			for coll in 1..sheet_data[0].size-1
				coll_name = sheet_data[0][coll]

				if coll_name.index(/\[\d\]/)
					puts 'Pass:%s' % coll_name
					next
				end

				if coll_name.end_with?('[{}]')
					arr_name = coll_name.chomp('[{}]')
					sub_obj_name = sheet_data[row][coll]
					puts '%s.%s' % [arr_name, sub_obj_name]

					if sub_obj_name == nil
						next
					end

					if json_obj[arr_name] == nil
						json_obj[arr_name] = []
					end

					for arr_coll in 0..(sheet_data[0].size-1-coll-1)
						arr_coll_name = sheet_data[0][arr_coll+coll+1]
						puts 'arr_coll_name:' + arr_coll_name

						if !arr_coll_name.index(/\[\d\]/) || sheet_data[row][coll+arr_coll+1] == nil
							break
						end
            
						if json_obj[arr_name][arr_coll] == nil
							json_obj[arr_name][arr_coll] = {}
						end
            
            if arr_coll_name.end_with?('[]')
              json_obj[arr_name][arr_coll][sub_obj_name] = []
              arr = sheet_data[row][coll+arr_coll+1].split(',')
              for elem in arr
                elem = elem.lstrip.rstrip.chomp
                if elem.to_i.to_s == elem
                  json_obj[arr_name][arr_coll][sub_obj_name].push(elem.to_i)
                  else
                  json_obj[arr_name][arr_coll][sub_obj_name].push(elem)
                end
              end
              next
            end
            
						json_obj[arr_name][arr_coll][sub_obj_name] = sheet_data[row][coll+arr_coll+1]
              
					end

					next
				end

				if coll_name.end_with?('[]')

					puts "coll name:" + coll_name
					coll_name = coll_name.chomp('[]')
          json_obj[coll_name] = []
          if sheet_data[row][coll] == nil
          else
            arr = sheet_data[row][coll].split(',')
            for elem in arr
              elem = elem.lstrip.rstrip.chomp
              if elem.to_i.to_s == elem
                json_obj[coll_name].push(elem.to_i)
              elsif elem.to_f.to_s == elem
                json_obj[coll_name].push(elem.to_f)
              else
                json_obj[coll_name].push(elem)
              end
            end
          end
					

					next
				end

				json_obj[coll_name] = sheet_data[row][coll]
			end
		end
  elsif sheet_first_head.end_with?('[{}]')
    puts sheet_first_head + ' is a object array.'
    
    json_array = []
    array_name = sheet_first_head.chomp('[{}]')
    array_id_name = array_name + '_id'
    for row in 1..sheet_data.size-1
      json_obj = {}
      json_obj[array_id_name] = sheet_data[row][0]
      for col in 1..sheet_data[row].size-1
        attribute_name = sheet_data[0][col]
        json_obj[attribute_name] = sheet_data[row][col];
      end
      json_array.push(json_obj)
    end
    
    output_obj[array_name] = json_array
  end
end

manifest=read_json($manifest_file)
for sheet in workbook.worksheets
	puts sheet.sheet_name
	sheet_data = sheet.extract_data

	json_obj = {}
	parse(json_obj, sheet_data)
  
  config_file_name=config_path + sheet.sheet_name + '-config.json'
	file = File.new(config_file_name, 'w')
  file << JSON.pretty_generate(json_obj)
	file.close
  
  puts "update manifest file"
  asset_key="tools/crypt/config/#{sheet.sheet_name}-config.json"
  puts asset_key
  manifest["assets"][asset_key]={:md5=>Digest::MD5.hexdigest(JSON.pretty_generate(json_obj))}
end

write_back_to_file($manifest_file,JSON.pretty_generate(manifest))
