import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { leaveFight } from '../communication';
import Canvas from '../components/Canvas';
import Popup from '../components/Popup';
import WebSocket from '../components/Websocket';
import { initApp } from '../controllers';
import { ECharacterState } from '../enums';
import type { IUserProfile } from '../types';
import {
  useFightsStore,
  useHistoryStore,
  useLogsStore,
  useMessagesStore,
  useProfileStore,
  useWebsocketStore,
} from '../zustand/store';
import CombatStage from './CombatStage';

interface IProps {
  profile: IUserProfile;
}

const Home: React.FC<IProps> = ({ profile }) => {
  const initHistory = useHistoryStore((state) => state.initHistory);
  const addMessages = useMessagesStore((state) => state.addMessages);
  const addLogs = useLogsStore((state) => state.setLogs);
  const addFight = useFightsStore((state) => state.addCurrentFight);
  const socketController = useWebsocketStore((state) => state.controller);
  const profileState = useProfileStore((state) => state.profile);
  const fights = useFightsStore((state) => state.fights);
  const playerActiveFight = useFightsStore((state) => state.activeFight);

  const { mutate } = useMutation({
    mutationFn: () => {
      return leaveFight();
    },
    onSuccess: () => {
      const { profile, setProfile } = useProfileStore.getState();
      setProfile({ ...profile!, state: 'Map' as ECharacterState });
    },
  });

  const fightModalHandler = (): void => {
    mutate();
  };

  useEffect(() => {
    console.log('profileState');
    console.log(profileState);
  }, [fights]);

  useEffect(() => {
    initApp(addMessages, addLogs, profile, addFight).catch((err) => {
      console.log('Cannot init app', err);
    });
  }, [addLogs, addFight, initHistory, addMessages, profile]);

  return (
    <div className="h-full w-full flex justify-center  ">
      <WebSocket />
      {socketController ? <Canvas /> : null}

      {profileState?.state === ECharacterState.Fight && (
        <Popup>
          <CombatStage combat={playerActiveFight} fightModalHandler={fightModalHandler} />
        </Popup>
      )}
    </div>
  );
};

export default Home;
