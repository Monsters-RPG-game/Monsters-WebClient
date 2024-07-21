import { getActiveFight, getMessages, getUserLogin, getUserProfile, login } from '../communication';
import { ECharacterState } from '../enums';
import Cookies from '../tools/cookies';
import type { IFightEntity, IPreparedMessagesBody, IUserProfile } from '../types';
import { useAccountStore, useProfileStore } from '../zustand/store';

export const loginUser = async (): Promise<void> => {
  const { setAccount } = useAccountStore.getState();
  const { setProfile } = useProfileStore.getState();
  const { setIsLoggedIn } = useAccountStore.getState();

  const data = await getUserLogin();
  const profile = await getUserProfile(data.data.login);

  setAccount({ id: data.data.sub, login: data.data.login });
  setProfile(profile.data?.data);
  setIsLoggedIn(true);
};

export const handleLogin = async (code: string): Promise<void> => {
  const { data } = await login(code);
  new Cookies().addLoginToken(data.access_token, data.expires_in);
  new Cookies().addRefreshToken(data.refresh_token, data.expires_in * 2);

  await loginUser();
};

export const initApp = async (
  addMessages: (messages: Record<string, IPreparedMessagesBody>) => void,
  // addLogs: (logs: ILog[]) => void,
  // @TODO: Create logic utilizing addLogs function
  profile: IUserProfile,
  addFight: (data: IFightEntity) => void,
): Promise<void> => {
  if (profile?.initialized) {
    const messages = await getMessages();
    addMessages(messages.data.data);
  }

  if (profile.state === ECharacterState.Fight) {
    const fight = await getActiveFight();
    console.log('fights in initApp: ', fight.data.data[0]);

    addFight(fight.data.data[0]);
  }
};
