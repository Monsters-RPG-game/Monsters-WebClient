import type React from 'react';
import { useEffect, useMemo } from 'react';
import Controller from '../controllers/websocket';
import { useHistoryStore, useWebsocketStore } from '../zustand/store';

const Websocket: React.FC = () => {
  const add = useHistoryStore((state) => state.addToHistory);
  const addController = useWebsocketStore(state => state.addController);

  const controller = useMemo(() => {
    return new Controller(add);
  }, [add]);

  useEffect(() => {
    controller.init().then(() => {
      if (controller) addController(controller);
      return undefined;
    }).catch(err => {
      console.log('Could not init webocket', err);
    });
  }, [controller, addController]);

  return null;
};

export default Websocket;
