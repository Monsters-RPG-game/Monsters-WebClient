import type { IFullError, ILoginBody, IPreLoginBody } from '../../types';
import Cookies from '../../tools/cookies';

export const refreshAccessToken = async (token: string): Promise<void> => {
  const server = process.env.REACT_APP_BACKEND!;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET!;
  const clientId = process.env.REACT_APP_CLIENT_ID!;

  const res = await fetch(`${server}/token`, {
    method: 'POST',
    credentials: 'include',
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: token,
      grant_type: 'refresh_token',
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (res.ok) {
    const data = (await res.json()) as ILoginBody;
    new Cookies().addLoginToken(data.access_token, data.expires_in);
    return;
  }
  const err = (await res.json()) as IFullError;
  throw err;
};

export const getUserLogin = async (): Promise<IPreLoginBody | undefined> => {
  const accessToken = new Cookies().getToken('monsters.uid');
  const server = process.env.REACT_APP_BACKEND!;

  const res = await fetch(`${server}/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    return (await res.json()) as IPreLoginBody;
  }
  const err = (await res.json()) as IFullError;
  throw err;
};

export const register = async (login: string, password: string, email: string): Promise<void> => {
  const server = process.env.REACT_APP_BACKEND!;

  const res = await fetch(`${server}/users/register`, {
    method: 'POST',
    body: JSON.stringify({ login, password, email }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    return;
  }
  const err = (await res.json()) as IFullError;
  throw err;
};

export const login = async (code: string): Promise<ILoginBody | undefined> => {
  const server = process.env.REACT_APP_BACKEND!;
  const redirectUrl = process.env.REACT_APP_REDIRECT_LOGIN_URL!;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET!;
  const clientId = process.env.REACT_APP_CLIENT_ID!;

  const res = await fetch(`${server}/token`, {
    method: 'POST',
    credentials: 'include',
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUrl,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  if (res.ok) {
    return (await res.json()) as ILoginBody;
  }
  const err = (await res.json()) as IFullError;
  throw err;
};