import { NextRequest } from "next/server";

const noLoginObject = {
  accessToken: undefined,
  refreshToken: undefined,
  expiresIn: undefined,
  refreshTokenExpiresIn: undefined,
};

const getCookiesFromRequest = (req: NextRequest) => {
  const login = req.cookies.get("login")?.value;
  if (!login) {
    return noLoginObject;
  }
  const loginObject = JSON.parse(login);
  const accessToken = loginObject.accessToken;
  if (!accessToken) {
    return noLoginObject;
  }
  const refreshToken = loginObject.refreshToken;
  const expiresIn = loginObject.expiresIn;
  const refreshTokenExpiresIn = loginObject.refreshTokenExpiresIn;
  return {
    accessToken,
    refreshToken,
    expiresIn,
    refreshTokenExpiresIn,
  };
};

export default getCookiesFromRequest;
