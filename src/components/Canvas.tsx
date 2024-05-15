import React, { useEffect, useState } from 'react';
import '../style/canva.css';

const mapImage = new Image();
mapImage.src = '/public/images/snowy-sheet.png';

const Canvas: React.FC = () => {
  const [mapModel, setMapModel] = useState<number[][]>();
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
  };

  useEffect(() => {
    renderMap();
  }, [mapModel]);

  useEffect(() => {
    const serverTransformedMap = transformMap(mapData);
    setMapModel(serverTransformedMap);
  }, []);

  const transformMap = (mapData: { fields: number[] }) => {
    const map2D: number[][] = [[]];
    const { fields } = mapData;
    let y = 0;

    for (let i = 0; i < fields.length; i++) {
      if (i % 10 === 0 && i !== 0) {
        map2D.push([]);
        y++;
      }

      map2D[y].push(fields[i]);
    }

    return map2D;
  };

  const renderMap = () => {
    const canvas = document.querySelector('canvas');
    const context = canvas?.getContext('2d') as CanvasRenderingContext2D;
    if (!context || !mapModel || mapModel.length === 0) return;
    context.fillStyle = '#000000';

    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    for (let row = 0; row < mapModel.length; row++) {
      for (let col = 0; col < mapModel[0].length; col++) {
        const id = mapModel[row][col];
        const imageRow = id / TILES_IN_ROW;
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
    }
  };


  return <canvas id='canva' />;
};

export default Canvas;

