import Body from './Body';
import Matter from "matter-js";
import scena from '../assets/scena.json';
import { getObject, getObjects, createArray } from '../action/action';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class Player {
  body = [];
  body2 = [];
  b;
  name = 'player';
  props = {};
  x = windowWidth / 2;
  y = windowHeight / 2;
  mx = 0
  my = 0;
  r = 0;
  h = 0;
  width = 0;
  height = 0;
  countBody = 4;
  rotates = 0;
  constructor(props) {
    this.props = props;
  }
  leftSwim() {
    return require('../assets/swim_to_left_sheet.png');
  }
  rightSwim() {
    return require('../assets/swim_to_right_sheet.png');
  }
  left() {
    return require('../assets/rest_to_left_sheet.png');
  }
  right() {
    return require('../assets/Rest_to_right_sheet.png');
  }
  create() {
    this.b = new Body(this.props);
    this.body = getObjects(scena, this.name).map((x) => {
      this.r = this.b.size(x.width)
      this.mx = this.b.size(x.x + x.width / 2);
      this.my = this.b.size(x.y + x.height / 2);
      this.width = this.b.size(x.width);
      this.height = this.b.size(x.height);
      return this.b.Bodies.circle(
        this.b.size(x.x + x.width / 2),
        this.b.size(x.y + x.height / 2),
        this.b.size(x.width),
        { width: this.b.size(x.width)}
      )
    });

    this.body.map((x) => this.b.World.add(this.props, x));
    return this.body;
  }

  createBody() {

    let r = this.r;
    var group = Matter.Body.nextGroup(true);
    this.body2[0] = Matter.Composites.stack(this.x - r, this.y + r, this.countBody, 1, 1, 1, function (x, y) {
      return Matter.Bodies.circle(x, y, r, { collisionFilter: { group: group } });
    });
    Matter.Composites.chain(this.body2[0], 0.5, 0, -0.5, 0, { stiffness: 0.8, length: 1, render: { type: 'line' } });
    Matter.Composite.add(this.body2[0], Matter.Constraint.create({
      bodyB: this.body2[0].bodies[0],
      pointB: { x: 0, y: 0 },
      pointA: { x: this.body[0].position.x, y: this.body[0].position.y },
      stiffness: 0.8,

    }));

    /*
   this.body2 =  createArray(5).map((x,i)=>this.b.Bodies.rectangle(500,i * this.width,this.width,this.height,
     {width:this.width,height:this.height}))
     console.log(this.body2)*/
    this.body2.map((x) => this.b.World.add(this.props, x));
    return this.body2;
  }

  composite() {
    /*
         var constraint = this.b.Constraint.create({
          pointA: {x: this.body2[0].position.x,y:this.body2[0].position.y},
          bodyA: this.body2[0],
          bodyB: this.body2[2],
          pointB:{x: this.body2[2].position.x,y:this.body2[2].position.y},
          length:10,
          stiffness:0.5
      });
  
      
     this.b.Composite.add(this.props,constraint)  ;*/
  }

 

  isSensor(t) {
    this.body.map((x) => (x.isSensor = t));
  }

  setInnertia(body, t) {
    body.map((x) => (Matter.Body.setInertia(x, t)));
  }

  rotate(n) {
    this.body.map((x) => Matter.Body.rotate(x, n))
  }
  setDensity(n) {
    this.body.map((x) => Matter.Body.setDensity(x, n))
  }
  setInertia(n){
    this.body.map((x) => Matter.Body.setInertia(x, n))
  }
  setMass(n){
    this.body.map((x) => Matter.Body.setMass(x, n))
  }
  setStatic(t) {
    this.body.map((x) => Matter.Body.setStatic(x, n))
}
}
