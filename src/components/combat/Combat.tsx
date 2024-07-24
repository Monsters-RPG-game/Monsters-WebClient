import type { IFightEntity } from '../../types';
import { CombatTeam } from './CombatTeam';

const Combat: React.FC<{ fight: IFightEntity; setTarget: React.Dispatch<React.SetStateAction<string>> }> = ({
  fight,
  setTarget,
}) => {
  return (
    <div className="h-[75svh]">
      <CombatTeam side="attacker" setTarget={setTarget} fight={fight} />
      <CombatTeam side="enemy" setTarget={setTarget} fight={fight} />
    </div>
  );
};

export { Combat };
