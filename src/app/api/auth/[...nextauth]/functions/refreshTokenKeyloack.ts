import axios from "axios";
import { REFRESH_TOKEN_STATUS } from "../type";

const refreshTokenKeyloack = async (
  token: any
): Promise<{
  status: REFRESH_TOKEN_STATUS;
  data: any;
}> => {
  try {
    const response = await axios.post(
      `${"https://sso-dev.up.railway.app"}/v1/api/token/refresh-token`,
      {
        client_id: "p2p",
        refresh_token: token.refreshToken || "",
      },
      {
        headers: {
          "x-api-key": process.env.X_API_KEY || "",
        },
      }
    );
    const data = await response;
    if (data?.status === 200) {
      return {
        status: REFRESH_TOKEN_STATUS.SUCCESS,
        data: data?.data?.data,
      };
    }
    return {
      status: REFRESH_TOKEN_STATUS.FAILED,
      data: null,
    };
  } catch (error) {
    console.error("🚀 ~ refreshTokenKeyloack ~ error:", error);
    return {
      status: REFRESH_TOKEN_STATUS.FAILED,
      data: null,
    };
  }
};

export default refreshTokenKeyloack;
