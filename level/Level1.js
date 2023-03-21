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
import Matter from 'matter-js';
import { GameEngine } from 'react-native-game-engine';
import Physics from '../Physics';
import Sprite from '../components/Sprite';
import MapImg from '../components/MapImg';
import Walls from '../classes/Body';
import Player from '../classes/Player';

import Block from '../components/Block';
import Map from '../classes/Map';
import TileMap from '../map/TileMap';
import scena from '../assets/scena.json';
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
  let map = new Map();
  let map2 = new Map();
  let map3 = new Map();
  let mapTop = new Map();
  map.create();
  map2.create();
  map3.create();
  mapTop.create();
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

  let game = {
    gameWorld: { engine: engine, world: world },
   
    map: {
      body: map.body,
      scena: scena,
      img: require('../assets/scena.png'),
      renderer: <MapImg />,
    },
     map2: {
      body: map2.body,
      scena: scena,
      img: require('../assets/scenaTop.png'),
      renderer: <MapImg />,
    },map3: {
      body: map3.body,
      scena: scena,
      img: require('../assets/scenaBottom.png'),
      renderer: <MapImg />,
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
