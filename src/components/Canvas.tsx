import React, { useEffect, useState } from 'react';
import startMap, { initLocation } from '../controllers/map';
import type { IMapEntity } from '../types';
import { useLocationStore } from '../zustand/store';

const Canvas: React.FC = () => {
  const userLocation = useLocationStore.getState();
  const [map, setMap] = useState<IMapEntity | undefined>(undefined);

  useEffect(() => {
    if (!map && !userLocation.x) {
      initLocation(setMap).catch(err => {
        console.log('Coulnt not init map', err);
      });
    } else {
      startMap();
    }
  }, [map, userLocation.x]);

  return <div id='game' />;
};

export default Canvas;

