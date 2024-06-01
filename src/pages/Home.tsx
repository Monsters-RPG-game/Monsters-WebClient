import React, { useEffect } from 'react';
import { initApp } from '../controllers';
import { useFightsStore, useHistoryStore, useLogsStore, useMessagesStore, useWebsocketStore } from '../zustand/store';
import type { IUserProfile } from '../types';
import WebSocket from '../components/Websocket';
import Canvas from '../components/Canvas';

const Home: React.FC<{
  profile: IUserProfile;
}> = ({ profile }) => {
  const initHistory = useHistoryStore((state) => state.initHistory);
  const addMessages = useMessagesStore((state) => state.addMessages);
  const addLogs = useLogsStore((state) => state.setLogs);
  const addFight = useFightsStore((state) => state.addCurrentFight);
  const socketController = useWebsocketStore(state => state.controller);

  useEffect(() => {
    initApp(addMessages, addLogs, profile, addFight)
      .catch((err) => {
        console.log('Cannot init app', err);
      });
  }, [addLogs, addFight, initHistory, addMessages, profile]);

  return (
    <div className="h-full w-full flex justify-center  ">
      <WebSocket />
      {socketController ? <Canvas /> : null}
    </div>
  );
};

export default Home;
