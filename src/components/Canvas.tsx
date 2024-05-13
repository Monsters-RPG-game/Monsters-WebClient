import React, { useEffect, useRef, useState } from 'react';
import images from '../constants/images';

const mapImage = new Image();
mapImage.src = "/public/images/snowy-sheet.png";


const Canvas:React.FC = () => {
const canvasRef= useRef();
const [mapModel,setMapModel]=useState();
const TILES_IN_ROW = 8;
const TILE_SIZE = 16;

const mapData = {
    '_id': {
      '$oid': '663f68098a0f3cbe18c003fb'
    },
    'fields': [
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      11,
      1
    ],
    'name': 'main',
    'height': 10,
    'width': 10
  }



useEffect(()=>{


  console.log(document.querySelector('canvas'));
  if(!canvasRef)return ;
    const canvas = canvasRef.current;

    if(!canvas)return;
    const context = canvas.getContext('2d');

if(!context)return;
renderMap(context)

renderMap()
},[])

useEffect(()=>{
  console.log('1');

  console.log(document.querySelector('canvas'));
  if(!canvasRef)return ;
    const canvas = canvasRef.current;

    if(!canvas)return;
    const context = canvas.getContext('2d');
    console.log('2');
if(!context)return;
console.log('3');
console.log(mapData)
   const serverTransformedMap = transformMap(mapData);
console.log("serverTransformedMap")
console.log(serverTransformedMap)
  setMapModel(serverTransformedMap);
  console.log("5")
  renderMap(context);
},[])


console.log("mapModel")
console.log(mapModel)
const transformMap=(mapData)=>{
  const map2D = [[]];
  const fields = mapData.fields
let y=0

for (let i = 0; i < fields.length; i++) {
  
  if(i%10===0 && i!==0){

   map2D.push([]);
   y++; 
  }
  map2D[y].push(fields[i]);
}

return map2D;
};





const renderMap=(context)=>{

  if(!mapModel || mapModel.length===0)return;
  context.fillStyle = "#ffff";

  console.log("TRANOSFER MAP");


  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
for (let row = 0; row < mapModel.length; row++) {

  for (let col = 0; col < mapModel[0].length; col++) {

    const id = mapModel[row][col];
    const imageRow = parseInt(id / TILES_IN_ROW);
    const imageCol = id % TILES_IN_ROW;
    context.drawImage(
      mapImage,
      imageCol * TILE_SIZE,
      imageRow * TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE,
      col * TILE_SIZE,
      row * TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE
    );
  }
  window.requestAnimationFrame(()=>renderMap(context));
}
};



  return (
 
    
      <canvas ref={canvasRef}/>
    
  );

};


export default Canvas;