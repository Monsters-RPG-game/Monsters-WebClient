import { Cookies } from '../tools';
import { ETokenNames, ETokenType } from '../enums';
import { revokeToken, sendToLogoutPage } from '../communication';

export const removeTokens = async (): Promise<void> => {
  const cookies = new Cookies();
  const accessToken = cookies.getToken(ETokenNames.Access);
  const refreshToken = cookies.getToken(ETokenNames.Refresh);

  await revokeToken(accessToken as string, ETokenType.Access);
  await revokeToken(refreshToken as string, ETokenType.Refresh);

  cookies.removeToken(ETokenNames.Access);
  cookies.removeToken(ETokenNames.Refresh);
};

export const logout = (): void => {
  removeTokens()
    .then(() => {
      sendToLogoutPage();
      return undefined;
    })
    .catch((err) => {
      console.log("Couldn't remove user tokens");
      console.log(err);
    });
};
