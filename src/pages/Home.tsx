import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { initApp } from '../controllers';
import { useFightsStore, useHistoryStore, useLogsStore, useMessagesStore, useProfileStore, useWebsocketStore } from '../zustand/store';
import type { IUserProfile } from '../types';
import WebSocket from '../components/Websocket';
import Canvas from '../components/Canvas';
import Popup from '../components/Popup';
import { leaveFight } from '../communication';
import { ECharacterState } from '../enums';

const Home: React.FC<{
  profile: IUserProfile;
}> = ({ profile }) => {
  const initHistory = useHistoryStore((state) => state.initHistory);
  const addMessages = useMessagesStore((state) => state.addMessages);
  const addLogs = useLogsStore((state) => state.setLogs);
  const addFight = useFightsStore((state) => state.addCurrentFight);
  const socketController = useWebsocketStore(state => state.controller);
  const profileState = useProfileStore((state) => state.profile);
  const fights = useFightsStore((state) => state.fights);





const {mutate}=useMutation({
  mutationFn:()=>{
    return leaveFight();
  },
  onSuccess:()=>{
    const {profile,setProfile}= useProfileStore.getState();
    setProfile({...profile, state:'MAP'});
  }
});

const fightModalHandler=():void=>{
  mutate();
};


useEffect(()=>{
  console.log('profileState');
console.log(profileState);
},[fights]);

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

{profileState.state===ECharacterState.Fight &&<Popup >
<div>
<button
className='bg-blue-500 text-slate-50 rounded font-semibold px-2 py-1'
onClick={fightModalHandler}>Leave Fight</button>
</div>
</Popup>}
    </div>
  );
};

export default Home;
