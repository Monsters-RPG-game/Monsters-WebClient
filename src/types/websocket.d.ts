import type { ESocketType } from '../enums';
import type { IUserProfile } from './account';

export interface ISocketMessage {
  type: ESocketType;
  state: Partial<IUserProfile>;
  payload: unknown;
}

export interface ISocketOutMessage {
  payload: unknown,
  target: string,
  subTarget: string
}

export interface ISocketNewMessage {
  receiver: string;
  sender: string;
  body: string;
}
