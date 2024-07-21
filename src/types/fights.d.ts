import type { IDefaultResponse } from './generic';
import type { IUserProfile } from './account';
import type { EFightAction } from '../enums';

export type ICreateFightResponse = { state: Partial<IUserProfile> } & IDefaultResponse;

export interface IActionEntity {
  character: string;
  action: EFightAction;
  target: string;
  value: number;
}

export interface IFightLogsEntity {
  logs: { phase: number; actions: IActionEntity[] }[];
}

export interface IFightTeam {
  character: string;
  action: string;
  target: string;
  value: number;
}

export interface IState {
  initialized: { attacker: IFightTeam[]; enemy: IFightTeam[] };
  current: { attacker: IFightTeam[]; enemy: IFightTeam[] };
}

export interface IFightEntity {
  log: IFightLogsEntity;
  states: IState;
  attacker: string;
  active: boolean;
  phase: number;
  start: string;
}
