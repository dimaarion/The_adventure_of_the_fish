import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Button,
  Pressable,
  Image,
} from 'react-native';
import { getObject, getObjects, getObjectData } from '../action/action';
import { ProcessingView } from 'expo-processing';
import Matter from 'matter-js';
import { GameEngine } from 'react-native-game-engine';
import Physics from '../Physics';
import Sprite from '../components/Sprite';
import Walls from '../classes/Body';
import Player from '../classes/Player';

import Ball from '../components/Ball';
import Block from '../components/Block';
import Map from '../classes/Map';
import TileMap from '../map/TileMap';
import scena from '../assets/scena.json';
import TestBall from '../components/TestBall';
import Joystick from '../classes/Joystick';
import JoystickView from '../components/JoystickView';
import Body from '../classes/Body';

export default function Level() {
  const [event, setEvent] = useState(0);
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;

  let body = new Body();
  let platform = new Walls(world);
  let player = new Player(world);
  let map = new Map('bg');
  map.create();
 let map2 = new Map('bg2');
  map2.create();
  let playerOptions = new Player();
  let joystick = new Joystick(
    body.procent(5),
    body.procent(37),
    body.procent(26),
    body.procent(26)
  );
  player.create('player');

  //let player2 = player.createBody();
  //player.composite();

  //player.isSensor(true)
  
  platform.createRect('platform');
  platform.isStatic(true);
  engine.gravity.y = 0.0;
  let gameEngine = null;
  React.useEffect(() => {
    gameEngine.dispatch({
      press: event,
    });
  }, [event]);
 platform.body.map((x)=>{
      if(x.types === "point"){
        
       map.body.x = x.position.x - x.width / 2
       map.body.y = x.position.y + x.height / 2
       map2.body.x = x.position.x - x.width / 2
       map2.body.y = x.position.y + x.height / 2
      }
    })
  let game = {
    gameWorld: { engine: engine, world: world },
   
    map: {
      body: map.body,
      scena: scena,
      size: 50,
      rows: 25,
      columns: 25,
      layers: getObjectData(scena, 'bg'),
      img: map.src(getObjectData(scena, 'bg'), require('../assets/18.png')),
      renderer: <TileMap />,
    },
     map2: {
      body: map2.body,
      scena: scena,
      size: 50,
      rows: 25,
      columns: 25,
      layers: getObjectData(scena, 'bg2'),
      img: map.src(getObjectData(scena, 'bg2'), require('../assets/earthWall2.png')),
      renderer: <TileMap />,
    },
    platform: {
      body: platform.body,
      color: 'blue',
      renderer: ()=>{},
    },
    player: {
      body: player.body,
      color: 'red',
      options: {
        frameImg: 6,
        colums: 6,
        play: true,
        loop: true,
        fps: 10,
        src: require('../assets/rightRest.png'),
      },
      renderer: <Sprite />,
    },
    // player2: { body: player2, color: "green", renderer: <TestBall /> },
    joystick: {
      body: {
        x: joystick.w,
        y: joystick.h,
        width: joystick.width,
        height: joystick.height,
        color: 'red',
      },
      position: [
        joystick.w + joystick.width / 2,
        joystick.h + joystick.height / 2,
      ],
      size: [100, 100],
      renderer: <JoystickView />,
    },
   
  };

  return (
    <GameEngine
      ref={(ref) => {
        gameEngine = ref;
      }}
      style={styles.container}
      systems={[Physics]}
      entities={game}
      onEvent={() => event}>
      <StatusBar hidden={true} />
    </GameEngine>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  btnRight: {
    position: 'absolute',
    top: 80 + '%',
    left: 80 + '%',
    transform: [{ rotate: '0deg' }],
  },
  btnLeft: {
    position: 'absolute',
    top: 80 + '%',
    left: 50 + '%',
    transform: [{ rotate: '180deg' }],
  },
  btnDown: {
    position: 'absolute',
    top: 88 + '%',
    left: 65 + '%',
    transform: [{ rotate: '90deg' }],
  },
  btnUp: {
    position: 'absolute',
    top: 72 + '%',
    left: 65 + '%',
    transform: [{ rotate: '-90deg' }],
  },
  img: {
    width: 50,
    resizeMode: 'contain',
  },
});
