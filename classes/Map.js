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
  
  body = {};
  
  create() {
    this.body = {x:0,y:0,width:1200,height:1200}
    return this.body;
  }

  src(x,img){
   return x.map((f)=>img);
     
  }

}
