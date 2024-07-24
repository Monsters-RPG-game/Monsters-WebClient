import React from 'react';
import type { IFightTeam } from '../../types';

const CombatActor: React.FC<{
  actorData: IFightTeam;
  side: 'enemy' | 'attacker';
  setTarget: React.Dispatch<React.SetStateAction<string>>;
}> = ({ actorData, side, setTarget }) => {
  const color = side === 'enemy' ? 'red' : 'lime-500';
  return (
    <div
      className={`border-transparent border-2 hover:border-${color}`}
      onClick={() => {
        setTarget(actorData.character);
      }}
    >
      <img src="public/images/warriorImage.png" alt="warriorImage" height="25%" width="100" />
    </div>
  );
};

export { CombatActor };
