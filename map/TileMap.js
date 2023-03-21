import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Body from '../classes/Body';
export default function TileMap(props) {
  let body = new Body();
  React.useEffect(()=>{
//console.log(props)
  },[])
  const tileMap = {
    rows: props.scena.width,
    columns: props.scena.height,
    layers: [props.body.data],
  };
  const layer = [];
  const mapIndex = [];
  tileMap.layers.forEach((l, index) => {
    for (let r = 0; r < tileMap.rows; r++) {
      // Loop over row
      for (let c = 0; c < tileMap.columns; c++) {
        // Loop over columns
        const gridIndex = r * tileMap.columns + c; // Get index in grid
        if (l[gridIndex] > 0) {
          mapIndex[gridIndex] = l[gridIndex];
        } else {
          mapIndex[gridIndex] = 't';
        }
        if (layer[gridIndex] !== 0) {
          layer.push({
            row: r,
            column: c,
            tileIndex: gridIndex,
            test: l[gridIndex],
          });
        }
      }
    }
  });
  function getTileStyles(column, row, size) {
    const left = column * size;
    const top = row * size;

    return {
      height: size,
      width: size,
      overflow: 'hidden',
      position: 'absolute',
      left: left + props.body.x,
      top: top + props.body.y,
    };
  }
  let img = props.img;
  return (
    <View style={styles.container}>
      {layer
        .filter((f, i) => f.test == mapIndex[i])
        .map((x,j) => (
          <Image
            key={j + "image"}
            style={getTileStyles(x.column, x.row,body.size(props.scena.tilewidth))}
            source={img[x.test - 1]}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: 'absolute' },
});
