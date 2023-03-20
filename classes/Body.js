import Matter from 'matter-js';
import { getObject, getObjects } from '../action/action';
import scena from '../assets/scena.json';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class Body {
  World = Matter.World;
  Bodies = Matter.Bodies;
  Engine = Matter.Engine;
  BodyMatter = Matter.Body;
  Composite = Matter.Composite;
  Constraint = Matter.Constraint;
  Composites = Matter.Composites;
  body = [];
  props = {};
  figure = 0;
  options = {
    animate: false,
    name: this.name,
    type: '',
  };
  scenaWidth = scena.width * scena.tilewidth;
  scenaHeigiht = scena.height * scena.tileheight;
  scenaSize = (this.scenaWidth + this.scenaHeigiht) / 1.6;

  constructor(props) {
    this.props = props;
  }

  procentIn(n, p) {
    return (n / 100) * p;
  }
  procent(x) {
    let r = windowWidth + windowHeight;
    return this.procentIn(r, x);
  }
  procentX(x) {
    let r = windowWidth;
    return this.procentIn(r, x);
  }
  procentY(x) {
    let r = windowHeight;
    return this.procentIn(r, x);
  }
  procentInv(n, p) {
    return (p * 100) / n;
  }

  size(num) {
    return this.procent(this.procentInv(this.scenaSize, num));
  }

  createRect(name) {
    this.name = name;
   // console.log(getObjects(scena, this.name))
    this.body = getObjects(scena, this.name).map((x) =>
      this.Bodies.rectangle(
        this.size(x.x + x.width / 2),
        this.size(x.y + x.height / 2),
        this.size(x.width),
        this.size(x.height),
        { width: this.size(x.width), height: this.size(x.height),types:x.type }
      )
    );
    this.body.map((x) => this.World.add(this.props, x));
    return this.body;
  }

  createCircle(name) {
    this.name = name;
    this.body = getObjects(scena, this.name).map((x) =>
      this.Bodies.circle(
        this.size(x.x + x.width / 2),
        this.size(x.y + x.width / 2),
        this.size(x.width),
        { width: this.size(x.width) }
        //this.procent(this.procentInv(this.scenaHeight(), x.height))
      )
    );
    this.body.map((x) => this.World.add(this.props, x));
    return this.body;
  }

  isStatic(t) {
    this.body.map((x) => (x.isStatic = t));
  }

  camera(p) {
    let player = getObjects(scena, 'player')[0];
    this.body.map((b) =>
      this.BodyMatter.translate(b, {
        x: -p.position.x + player.x,
        y: -p.position.y + player.y,
      })
    );
  }
}
