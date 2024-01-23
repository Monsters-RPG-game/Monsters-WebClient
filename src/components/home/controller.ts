import { generateRandomName } from '../../tools';
import type { ETokenType } from '../../enums';
import type { IFullError } from '../../types';
import type { MainDispatch } from '../../redux/types';
import * as hooks from '../../redux';

export const sendToLoginPage = (): void => {
  // #TODO This should generate nonce, which should be validated back by response. Nonce should be saved in cookies for max of 10 min. If user won't manage to log in after that time, login should not be validated
  const server = process.env.REACT_APP_BACKEND!;
  const redirectUrl = process.env.REACT_APP_REDIRECT_LOGIN_URL!;
  const clientId = process.env.REACT_APP_CLIENT_ID!;

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUrl,
    nonce: generateRandomName(30),
    scope: 'openid',
  }).toString();

  window.location.href = `${server}/auth?${params}`;
};

export const sendToLogoutPage = (token: string): void => {
  const server = process.env.REACT_APP_BACKEND!;
  const redirectUrl = process.env.REACT_APP_HOME!;
  const clientId = process.env.REACT_APP_CLIENT_ID!;

  const params = new URLSearchParams({
    id_token_hint: token,
    post_logout_redirect_uri: redirectUrl,
    client_id: clientId,
  }).toString();

  window.location.href = `${server}/session/end?${params}`;
};

export const revokeToken = async (token: string, type: ETokenType): Promise<void> => {
  const server = process.env.REACT_APP_BACKEND!;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET!;
  const clientId = process.env.REACT_APP_CLIENT_ID!;

  const res = await fetch(`${server}/token/revocation`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      token,
      token_type_hint: type,
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });
  if (res.ok) return;
  const err = (await res.json()) as IFullError;
  throw err;
};

export const generateNewUserLogs = (dispatch: MainDispatch): void => {
  const newUserMessages = [
    'Hi. My name is Jessica. Welcome to our adventure guild. In order to register as an adventurer, I need you to provide me with some information. Please fill out this form.',
    '[You pick up the registration form and start reading]',
    'Please provide your race: ',
  ];

  newUserMessages.forEach((message) => dispatch(hooks.addLog({ message })));
};
