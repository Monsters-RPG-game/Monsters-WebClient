import React from 'react';
import type { IFightEntity } from '../types';

const CombatStage: React.FC<{ combat: IFightEntity | undefined; fightModalHandler: () => void }> = ({
  combat,
  fightModalHandler,
}) => {
  console.log(combat, fightModalHandler);
  return <div>CombatStage</div>;
};

export default CombatStage;
