import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export  function getObjects(scena, name){
    let layers = scena.layers;
    let nameObject = name;
    let arrObject = [];
    let layersObjects = layers.map((x)=>x.objects).filter((f)=>f !== undefined)
    layersObjects.map((x,i)=>x.filter((f2)=>f2.name === nameObject).map((x2,j)=>arrObject[j] = x2))
    return arrObject;
}

export function getObject(scena, name){
    return scena.layers.filter((f,i)=>f.name === name).map((x,i)=>x)[0];
}

export function getObjectData(scena, name){
    return scena.layers.filter((f,i)=>f.name === name).map((x,i)=>x)[0].data;
}
export function camera(e, player, scena, Matter) {
    Array.isArray(e)
      ? e.map((b) =>
          Matter.Body.translate(b, {
            x: -player.position.x +  windowWidth / 2,
            y: -player.position.y + windowHeight / 2 ,
          })
        )
      : Matter.Body.translate(e, {
          x: -player.position.x + scena.x,
          y: -player.position.y + scena.y,
        });
  }