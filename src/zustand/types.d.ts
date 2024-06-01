import type * as types from '../types';
import type WebsocketController from '../controllers/websocket';

export type ProfileStore = {
  profile: types.IUserProfile | undefined;
  setProfile: (profile: types.IUserProfile) => void;
};

export type IAccountStore = {
  isLoggedIn: boolean;
  account: types.IUser | undefined;
  setAccount: (data: types.IUser) => void;
  setIsLoggedIn: (data: boolean) => void;
};

export type IHistoryStore = {
  history: { target: string; message: string }[];
  addToHistory: (target: string, message: string) => void;
  initHistory: (commands: { target: string; message: string }[]) => void;
  clearHistory: () => void;
};

export type IFightStore = {
  activeFight: types.IFightEntity | undefined;
  fights: types.IFightEntity[];
  addCurrentFight: (data: types.IFightEntity) => void;
  removeCurrentFight: () => void;
  addFights: (data: types.IFightEntity[]) => void;
};

export type ILogsStore = {
  logs: types.ILog[];
  setLogs: (logs: types.ILog[]) => void;
};

export type IMessagesStore = {
  messages: Record<string, types.IPreparedMessagesBody>;
  addMessages: (messages: Record<string, types.IPreparedMessagesBody>) => void;
};

export type IWebsocketStore = {
  controller: WebsocketController | undefined,
  addController: (controller: WebsocketController) => void;
};

export type ILocationStore = {
  map: string;
  x: number;
  y: number
  initLocation: (data: { x: number, y: number, map?: string }) => void;
};


