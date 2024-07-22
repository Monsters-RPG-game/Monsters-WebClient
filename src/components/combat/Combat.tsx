import type { IFightEntity } from '../../types';
import { CombatTeam } from './CombatTeam';

const Combat: React.FC<{ fight: IFightEntity; setTarget: React.Dispatch<React.SetStateAction<string>> }> = ({
  fight,
  setTarget,
}) => {
  return (
    <>
      <CombatTeam side="attacker" setTarget={setTarget} fight={fight} />
      <CombatTeam side="enemy" setTarget={setTarget} fight={fight} />
    </>
  );
};

export { Combat };
