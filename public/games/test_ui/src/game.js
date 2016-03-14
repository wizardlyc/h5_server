/**
 * Created by wizard on 16/3/7.
 */

window.onload = function () {
  // create an new instance of a pixi stage

  var renderer = PIXI.autoDetectRenderer(480, 640);
  //renderer.resize(800, 600);
  document.body.appendChild(renderer.view);

  var stage = new PIXI.Container();

  renderer.view.style.position = "absolute";
  renderer.view.style.display = "block";
  renderer.autoResize = true;
  //renderer.resize(window.innerWidth, window.innerHeight);


  var guiObj = {
    id: 'main',
    component: 'Window',
    header: { id: 'ttl', skin: 'blueheader', position: { x: 0, y: 0 }, height: 40, text: 'Title' },
    draggable: true,
    padding: 4,
    position: { x: 0, y: 0 },
    width: 600,
    height: 550,
    layout: [1, 3],
    children: [
      {
        component: 'Layout',
        position: { x: 0, y: 0 },
        width: 500,
        height: 150,
        layout: [2, 1],
        children: [
          {
            id: 'btn1',
            text: 'btn',
            font: {
              size: '42px',
              family: 'Skranji',
              color: 'red'
            },
            component: 'Button',
            skin: 'bluebutton',
            position: 'center',
            width: 190,
            height: 80
          },
          {
            component: 'Layout',
            position: { x: 0, y: 0 },
            width: 250,
            height: 140,
            layout: [1, 4],
            children: [
              { id: 'radio1', text: 'choice 1', component: 'Radio', group: 1, position: 'center', width: 30, height: 30 },
              { id: 'radio2', text: 'choice 2', component: 'Radio', group: 1, position: 'center', width: 30, height: 30 },
              { id: 'radio3', text: 'choice 3', component: 'Radio', group: 1, position: 'center', width: 30, height: 30 },
              { id: 'radio4', text: 'choice 4', component: 'Radio', group: 1, position: 'center', width: 30, height: 30 }
            ]
          }
        ]
      },
      {
        id: 'hlist1',
        component: 'List',
        padding: 3,
        position: 'center',
        width: 400,
        height: 150,
        layout: [4, null],
        children: [
          { component: 'Button', position: 'center', width: 90, height: 120 },
          null,
          { component: 'Button', position: 'center', width: 90, height: 120 },
          { component: 'Button', position: 'center', width: 90, height: 120 },
          { component: 'Button', position: 'center', width: 90, height: 120 },
          { component: 'Button', position: 'center', width: 90, height: 120 },
          { component: 'Button', position: 'center', width: 90, height: 120 },
          { component: 'Button', position: 'center', width: 90, height: 120 },
          { component: 'Button', position: 'center', width: 90, height: 120 },
          { component: 'Button', position: 'center', width: 90, height: 120 },
          { component: 'Button', position: 'center', width: 90, height: 120 },
        ]
      },
      {
        id: 'btn2',
        component: 'Checkbox',
        position: 'center',
        text: 'Checkbox',
        width: 30,
        height: 30
      }
    ]
  }

  var guiContainer, theme;


  function onAssetsLoaded() {
    requestAnimationFrame(animate);
    //sprite.setTexture(texture2);
    EZGUI.Theme.load(['./assets/ui/kenney-theme/kenney-theme.json'], function () {
      guiContainer = EZGUI.create(guiObj, 'kenney');//new EZGUI.GUISprite(guiObj, guiTheme);
      //guiContainer.visible = false;
      EZGUI.components.btn1.on('click', function (event) {
        console.log('clicked', event);
      });
      stage.addChild(guiContainer);
    });

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(stage);
    }
  }
  onAssetsLoaded();
}