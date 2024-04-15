import Cookies from './cookies';
import getHttpClient from './axios';

export const generateRandomName = (max = 20): string => {
  const vocabulary = 'ABCDEFGHIJKLMNOUPRSTUWZabcdefghijklmnouprstuwz';
  let name = '';
  for (let x = 0; x < max; x++) {
    name += vocabulary[Math.floor(Math.random() * vocabulary.length)];
  }
  return name;
};

export const sleep = async (milliseconds: number): Promise<void> => {
  // eslint-disable-next-line compat/compat
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
};

export { getHttpClient, Cookies };
