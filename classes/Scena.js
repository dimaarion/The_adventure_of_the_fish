import Body from './Body';
import scena from '../assets/scena.json';
import { getObject, getObjects } from '../action/action';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class Scena {
  body = [];
  props = {};
  x = windowWidth / 2;
  y = windowHeight / 2;
  constructor(props) {
    this.props = props;
  }
  create() {
    const b = new Body(this.props);

    this.body[0] = b.Bodies.rectangle(
      b.procent(b.procentInv(b.scenaSize, 0)),
      b.procent(b.procentInv(b.scenaSize, 0)),
      b.procent(b.procentInv(b.scenaSize, b.scenaWidth)),
      b.procent(b.procentInv(b.scenaSize, b.scenaHeigiht)),
      {
        width: b.procent(b.procentInv(b.scenaSize, b.scenaWidth)),
        height: b.procent(b.procentInv(b.scenaSize, b.scenaHeigiht)),
      }
    )

    this.body.map((x) => b.World.add(this.props, x));
    return this.body;
  }

  isStatic(t) {
    this.body.map((x) => (x.isStatic = t));
  }
  isSensor(t) {
    this.body.map((x) => (x.isSensor = t));
  }




}
