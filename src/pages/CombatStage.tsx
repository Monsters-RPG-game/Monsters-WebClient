import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { attack, leaveFight } from '../communication';
import type { ECharacterState } from '../enums';
import { useFightsStore, useProfileStore } from '../zustand/store';
import { Combat } from '../components/combat/Combat';

const CombatStage: React.FC = () => {
  const fights = useFightsStore((state) => state.fights);
  const playerActiveFight = useFightsStore((state) => state.activeFight);
  const [target, setTarget] = useState<string>('');

  useEffect(() => {
    console.log('fights: ', fights);
    console.log('playerActiveFight: ', playerActiveFight);
    console.log('target: ', target);
  }, [playerActiveFight, target]);

  const { mutate: leave } = useMutation({
    mutationFn: () => {
      return leaveFight();
    },
    onSuccess: () => {
      const { profile, setProfile } = useProfileStore.getState();
      setProfile({ ...profile!, state: 'Map' as ECharacterState });
    },
  });

  const { mutate: action } = useMutation({
    mutationFn: async (target: string) => {
      const response = await attack(target);
      console.log('response: ', response);
      return response;
    },
    onSuccess: () => {},
  });
  if (!playerActiveFight) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div>CombatStage</div>
      <Combat fight={playerActiveFight} setTarget={setTarget} />
      <button
        className="flex bottom"
        type="button"
        onClick={() => {
          leave();
        }}
      >
        Leave
      </button>
      <button
        type="button"
        onClick={() => {
          action(target);
        }}
      >
        Attack
      </button>
    </>
  );
};

export default CombatStage;
