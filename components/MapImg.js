import React from 'react';
import Body from '../classes/Body';
import {
  SafeAreaView,
  View,
  Button,
  TextInput,
  Switch,
  Text,
  Image,
  KeyboardAvoidingView
} from 'react-native';
export default function ImageStatic(props) {
  let body = new Body();
  return (<View>
    <Image style={{ resizeMode: 'stretch', position: "absolute", top: props.body.y, left: props.body.x, width: body.size(props.scena.width * props.scena.tilewidth), height: body.size(props.scena.height * props.scena.tileheight) }} source={props.img} />
    <Image style={{ resizeMode: 'stretch', position: "absolute", top: props.body.y , left: props.body.x + body.size(props.scena.width * props.scena.tilewidth), width: body.size(props.scena.width * props.scena.tilewidth), height: body.size(props.scena.height * props.scena.tileheight) }} source={props.img} />
    <Image style={{ resizeMode: 'stretch', position: "absolute", top: props.body.y , left: props.body.x - body.size(props.scena.width * props.scena.tilewidth), width: body.size(props.scena.width * props.scena.tilewidth), height: body.size(props.scena.height * props.scena.tileheight) }} source={props.img} />
  </View>)
}