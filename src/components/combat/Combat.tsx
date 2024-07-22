import { useMutation } from 'react-query';
import { attack, leaveFight } from '../../communication';
import type { ECharacterState } from '../../enums';
import type { IFightEntity } from '../../types';
import { useProfileStore } from '../../zustand/store';
import { CombatTeam } from './CombatTeam';

const Combat: React.FC<{ fight: IFightEntity; setTarget: React.Dispatch<React.SetStateAction<string>> }> = ({
  fight,
  setTarget,
}) => {
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
  return (
    <>
      <CombatTeam side="attacker" setTarget={setTarget} fight={fight} />
      <CombatTeam side="enemy" setTarget={setTarget} fight={fight} />
    </>
  );
};

export { Combat };
