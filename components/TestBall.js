import React, { PureComponent, useEffect } from "react";
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';

export default function TestBall(props) {
    let color = "black";
    if (props.color) {
        color = props.color;
    }

    useEffect(() => {
 //console.log(props)
    }, [])
   
   return (props.body[0].bodies.map((x) => <View style={
        { 
            left: x.position.x - x.circleRadius, 
            top: x.position.y - x.circleRadius , 
            width: x.circleRadius + x.circleRadius, 
            height: x.circleRadius+ x.circleRadius, 
            backgroundColor: color,
            position:"absolute",
            borderRadius:x.circleRadius
            
        }
    } key={x.id}></View>)
    
    )
}