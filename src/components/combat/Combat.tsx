import type { IFightEntity, IFightTeam } from '../../types';
import { CombatActor } from './CombatActor';

const Combat: React.FC<{ fight: IFightEntity; setTarget: React.Dispatch<React.SetStateAction<string>> }> = ({
  fight,
  setTarget,
}) => {
  return (
    <>
      {fight.states.current.attacker.map((actor: IFightTeam) => (
        <CombatActor key={actor.character} actorData={actor} setTarget={setTarget} />
      ))}
      {fight.states.current.enemy.map((actor: IFightTeam) => (
        <CombatActor key={actor.character} actorData={actor} setTarget={setTarget} />
      ))}
    </>
  );
};

export { Combat };
