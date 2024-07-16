import React from 'react';
import { useMutation } from 'react-query';
import { attack, leaveFight } from '../communication';
import type { ECharacterState } from '../enums';
import { useProfileStore } from '../zustand/store';

const CombatStage: React.FC = () => {
  // const playerActiveFight = useFightsStore((state) => state.activeFight);

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
    mutationFn: (target: string) => {
      const response = attack(target);
      console.log('response: ', response);
      return response;
    },
    onSuccess: () => {},
  });

  return (
    <>
      <div>CombatStage</div>
      <button
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
          action('target');
        }}
      >
        Attack
      </button>
    </>
  );
};

export default CombatStage;
