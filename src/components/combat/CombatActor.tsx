import React from 'react';
import type { IFightTeam } from '../../types';

const CombatActor: React.FC<{ actorData: IFightTeam }> = ({ actorData }) => {
  return <div>{actorData.character}</div>;
};

export { CombatActor };
