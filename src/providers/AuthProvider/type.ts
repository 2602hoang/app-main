export type AccessToken = string | undefined;
export type RefreshToken = string | undefined;
export type AuthContextType = {
  accessToken?: AccessToken;
  refreshToken?: RefreshToken;
};
