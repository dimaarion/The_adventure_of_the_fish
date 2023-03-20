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
          x: -player.position.x + +  windowWidth / 2,
          y: -player.position.y +  windowHeight / 2 ,
        });
        
  }

export function createArray(num){
  let a = [];
    for(let i = 0; i < num; i++){
      a[i] = i;
    }
    return a;
  }

  export const collideRectRect = function (x, y, w, h, x2, y2, w2, h2) {
  //2d
  //add in a thing to detect rectMode CENTER
  if (
    x + w >= x2 && // r1 right edge past r2 left
    x <= x2 + w2 && // r1 left edge past r2 right
    y + h >= y2 && // r1 top edge past r2 bottom
    y <= y2 + h2
  ) {
    // r1 bottom edge past r2 top
    return true;
  }
  return false;
};


 function procentIn(n, p) {
  return (n / 100) * p;
}
export function procent(x) {
  let r = windowWidth + windowHeight;
  return procentIn(r, x);
}
export function procentX(x) {
  let r = windowWidth;
  return procentIn(r, x);
}
export function procentY(x) {
  let r = windowHeight;
  return procentIn(r, x);
}
export function procentInv(n, p) {
  return (p * 100) / n;
}



