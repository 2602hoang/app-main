import { REFRESH_TOKEN_STATUS } from "../type";

const refreshTokenKeyloack = async (
  token: any
): Promise<{
  status: REFRESH_TOKEN_STATUS;
  data: any;
}> => {
  try {
    const response = await fetch(
      `${"https://sso.teknix.dev/realms/teknix-auth"}/protocol/openid-connect/token`,
      {
        method: "POST",
        body: new URLSearchParams({
          grant_type: "refresh_token",
          client_id: "p2p",
          client_secret: process.env.KEYCLOAK_CLIENT_SECRET || "",
          refresh_token: token.refreshToken || "",
        }),

        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return {
      status: REFRESH_TOKEN_STATUS.SUCCESS,
      data: await response.json(),
    };
  } catch {
    return {
      status: REFRESH_TOKEN_STATUS.FAILED,
      data: null,
    };
  }
};

export default refreshTokenKeyloack;
