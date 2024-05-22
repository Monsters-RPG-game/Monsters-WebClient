import React, { useEffect } from 'react';
import startMap from '../controllers/map';

const Canvas: React.FC = () => {

  useEffect(() => {
    startMap();
  }, []);

  return <div id='game' />;
};

export default Canvas;

