import Matter from 'matter-js';
import scena from './assets/scena.json';
import { Dimensions } from 'react-native';
import Body from './classes/Body';
import Joystick from './classes/Joystick';
import { getObject, getObjects, camera } from './action/action';
import Player from './classes/Player';
import Collide from './classes/Collide';
let startPlay = 1;
let startUp = 0;
let plPosY = 0;
let press = 0;
let pages = { x: 0, y: 0 };
let collision = false;
let collisionPl = false;
let pressPos = { x: 0, y: 0 };
let rePress = 0;
let c = 0;
let c2 = 0;
export default function Physics(entities, { touches, time, events, world }) {
  let body = new Body();
  const collide = new Collide();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  let engine = entities.gameWorld.engine;
  let player = entities.player.body;
  let playerOptions = entities.player.options;
  let joystickV = entities.joystick.body;
  let joystickPosition = entities.joystick.position;
  let joystickSize = entities.joystick.size;
  let platform = entities.platform.body;
  let maps = entities.map.body;
  let maps2 = entities.map2.body;
  let pl = new Player();
  platform.map((x) => Matter.Body.setInertia(x, 0.1));
  
  camera(platform, player[0], getObjects(scena, 'player')[0], Matter);
  

  let type = '';
  events.map((x) => {});
  touches.map((x) => {
    type = x.type;
    pages.x = x.event.pageX;
    pages.y = x.event.pageY;
    if (x.type === 'start') {
      press = 1;
    } else if (x.type === 'end') {
      press = 0;
    }
  });

  let r = 0;
  let t = 0;

  let joystick = new Joystick(
    joystickV.x + joystickV.width / 2,
    joystickV.y + joystickV.height / 2
  );
  let jsCollision = collide.collidePointRect(
    pages.x,
    pages.y,
    joystickV.x,
    joystickV.y,
    joystickV.width,
    joystickV.height
  );
 
  player[0].angle = 0;
  joystick._atan2(pages.x, pages.y);
  Matter.Body.setPosition(player[0], {
    x: pl.x,
    y: pl.y,
  });

  if (press === 1) {
    platform.map((x)=>{
      if(x.types === "point"){
       maps.x = x.position.x - x.width / 2
       maps.y = x.position.y - x.height / 2
       maps2.x = x.position.x - x.width / 2
       maps2.y = x.position.y - x.height / 2
      }
    })
   
    if (jsCollision) {
      joystickPosition[0] = pages.x;
      joystickPosition[1] = pages.y;
      Matter.Body.setPosition(player[0], {
        x: pl.x + joystick.xpos * 30,
        y: pl.y + joystick.ypos * 50,
      });
    } else {
      joystickPosition[0] = joystickV.x + joystickV.width / 2;
      joystickPosition[1] = joystickV.y + joystickV.height / 2;
    }
    if (joystick.xpos > 0) {
      playerOptions.src = pl.rightSwim();
    } else {
      playerOptions.src = pl.leftSwim();
    }
//maps.x =( maps.x + -player[0].position.x +  windowWidth / 2);
  } else {
    if (joystick.xpos > 0) {
      playerOptions.src = pl.right();
    } else {
      playerOptions.src = pl.left();
    }
    joystickPosition[0] = joystickV.x + joystickV.width / 2;
    joystickPosition[1] = joystickV.y + joystickV.height / 2;
  }
  Matter.Engine.update(engine, time.delte);
  return entities;
}
