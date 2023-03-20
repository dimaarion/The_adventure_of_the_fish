import React from 'react';
import {
  SafeAreaView,
  View,
  Button,
  TextInput,
  Switch,
  Text,
  KeyboardAvoidingView
} from 'react-native';
import SpriteSheet from '../animate/SpriteSheet';

export default class Sprite extends React.Component {
  state = {
    loop: this.props.options.loop,
    resetAfterFinish: false,
    fps: this.props.options.fps
  };

  generateArray(l){
    let a = [];
    for(let i = 0; i < l; i++){
       a[i] = i
    }
    return a;
  }
 componentDidMount(){
  if(this.props.options.play){
    this.play("walk");
  }
 }

  render() {
 
    const { fps, loop, resetAfterFinish } = this.state;

    return this.props.body.map((x)=>
     
          <View key={x.id} style={{left:x.position.x - x.width ,top:x.position.y - x.width ,position:"absolute", transform: [{ rotate: x.angle+"deg" }]}}>
          
           { <SpriteSheet
              ref={ref => (this.mummy = ref)}
              source={this.props.options.src}
              columns={this.props.options.colums}
              rows={1}
              width={x.width * 2}
              height = {x.width * 2}
              offsetX={0}
              offsetY={0}
              imageStyle={{ marginTop: -1 }}
              animations={{
                walk: this.generateArray(this.props.options.frameImg),
                appear: Array.from({ length: 15 }, (v, i) => i + 18),
                die: Array.from({ length: 21 }, (v, i) => i + 33)
              }}
            />}
          </View>
          
    );
  }

  play = type => {
    const { fps, loop, resetAfterFinish } = this.state;

    this.mummy.play({
      type,
      fps: Number(fps),
      loop: loop,
      resetAfterFinish: resetAfterFinish,
      onFinish: () => console.log('hi')
    });
  };

  stop = () => {
    this.mummy.stop(() => console.log('stopped'));
  };
}