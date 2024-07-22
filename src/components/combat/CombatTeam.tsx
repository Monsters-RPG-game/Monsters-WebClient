import React from 'react';
import type { IFightEntity, IFightTeam } from '../../types';
import { CombatActor } from './CombatActor';

const CombatTeam: React.FC<{
  side: 'attacker' | 'enemy';
  fight: IFightEntity;
  setTarget: React.Dispatch<React.SetStateAction<string>>;
}> = ({ side, fight, setTarget }) => {
  return (
    <div className={`${(side === 'enemy' && 'absolute right-10') || (side === 'attacker' && 'absolute left-10')}`}>
      {fight.states.current[`${side}`].map((actor: IFightTeam) => (
        <div
          key={actor.character}
          onClick={() => {
            setTarget(actor.character);
          }}
        >
          <CombatActor actorData={actor} />
        </div>
      ))}
    </div>
  );
};

export { CombatTeam };
