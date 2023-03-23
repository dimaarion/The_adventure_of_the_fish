import React, { PureComponent, useEffect } from "react";
import { StyleSheet, Text, View, Image, StatusBar, RootTagContext } from 'react-native';

export default function SpriteImg(props) {
    let color = "black";
    if (props.color) {
        color = props.color;
    }

    useEffect(() => {
  //console.log(props.body[0].type)
    }, [])
  
   return (props.body.map((x) => <View style={
        { 
            left: x.position.x - x.width / 2, 
            top: x.position.y - x.height / 2, 
            width: x.width , 
            height: x.height, 
            backgroundColor: color,
            position:"absolute",
            transform: [{ rotate: x.angle+"deg" }]
            
        }
    } key={x.id}></View>)
    
    )
}