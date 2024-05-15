import React, { useEffect } from 'react';
import { initApp } from '../controllers';
import { useFightsStore, useHistoryStore, useLogsStore, useMessagesStore } from '../zustand/store';
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

  useEffect(() => {
    initApp(addMessages, addLogs, profile, addFight)
      .then((logs) => {
        const preparedLogs =
          logs.length > 0
            ? logs.map((l) => {
              return { message: l.message, target: l.target };
            })
            : [];
        return initHistory(preparedLogs);
      })
      .catch((err) => {
        console.log('Cannot init app', err);
      });
  }, [addLogs, addFight, initHistory, addMessages, profile]);

  return (
    <div className="h-full w-full flex justify-center  ">
      <WebSocket />
      <Canvas />
    </div>
  );
};

export default Home;
