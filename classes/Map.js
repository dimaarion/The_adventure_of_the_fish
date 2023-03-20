import Matter from 'matter-js';
import Body from './Body';
import { getObject, getObjects } from '../action/action';
import scena from '../assets/scena.json';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class Map {
  World = Matter.World;
  Bodies = Matter.Bodies;
  Engine = Matter.Engine;
  BodyMatter = Matter.Body;
  Composite = Matter.Composite;
  Constraint = Matter.Constraint;
  Composites = Matter.Composites;
  name = "bg";
  body = {};
  b;
  image = [{"id":18,"img":require('../assets/18.png')}];
  arr = [];
  // props = ;

  constructor(name) {
    this.name = name;
  }
  create() {
    this.body = getObject(scena,this.name)
    return this.body;
  }

  src(x,img){
   return x.map((f)=>img);
     
  }
}
