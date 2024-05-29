import React, { useEffect, useState } from 'react';
import startMap from '../controllers/map';
import type { IMapEntity } from '../types';
import { getMap } from '../communication';

const Canvas: React.FC = () => {
  const [map, setMap] = useState<IMapEntity | undefined>(undefined);

  useEffect(() => {
    if (!map) {
      if (!sessionStorage.getItem('mainMap')) {
        getMap().then((data) => {
          setMap(data.data.data);
          sessionStorage.setItem('mainMap', JSON.stringify(data.data.data));
          startMap();
          return undefined;
        }).catch(err => {
          console.log('Cannot fetch map');
          console.log(err);
        });
      } else {
        setMap(JSON.parse(sessionStorage.getItem('mainMap') as string) as IMapEntity);
      }
    } else {
      startMap();
    }
  }, [map]);

  return <div id='game' />;
};

export default Canvas;

