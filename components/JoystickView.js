import React, { PureComponent, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  RootTagContext,
} from 'react-native';

export default function JoystickView(props) {
  let color = 'black';
  if (props.color) {
    color = props.color;
  }

  useEffect(() => {
    
  }, []);

  return (
    <View
      style={{
        left: props.body.x,
        top: props.body.y,
        width: props.body.width,
        height: props.body.height,
        position: 'absolute',
        
      }}>
      <View 
      style={{
        left: 40,
        top: 40,
        width: props.body.width - 80,
        height: props.body.height - 80,
        borderWidth:2,
        borderColor: "green",
        position: 'absolute',
        borderRadius:props.body.width / 2
      }}
      ></View>
      <View
        style={{
          backgroundColor: 'blue',
          width: props.size[0],
          height: props.size[1],
          top: props.position[1] - (props.body.y + props.size[1] / 2),
          left: props.position[0] - (props.body.x) - props.size[0] / 2 ,
          position: 'absolute',
          borderRadius:props.size[0] / 2
        }}>
        </View>
    </View>
  );
}
