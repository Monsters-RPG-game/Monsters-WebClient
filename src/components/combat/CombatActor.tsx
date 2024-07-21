import React from 'react';
import type { IFightTeam } from '../../types';

const CombatActor: React.FC<{ actorData: IFightTeam; setTarget: React.Dispatch<React.SetStateAction<string>> }> = ({
  actorData,
  setTarget,
}) => {
  return (
    <div
      onClick={() => {
        setTarget(actorData.character);
      }}
    >
      actorData
    </div>
  );
};

export { CombatActor };
