import { REFRESH_TOKEN_STATUS } from "@/app/api/auth/[...nextauth]/type";
import { AccessToken } from "@/providers/AuthProvider/type";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useToken = () => {
  const [accessToken, setAccessToken] = useState<AccessToken>(undefined);
  const { data: session, update, status } = useSession();
  useEffect(() => {
    if (
      status === "unauthenticated" ||
      session?.error === REFRESH_TOKEN_STATUS.FAILED
    ) {
      signIn("keycloak");
      return;
    }
    console.log("session", session);

    if (status === "authenticated" && session?.accessToken) {
      setAccessToken(session.accessToken);
      // const tokenData = {
      //   email: session?.user?.email || "unknown",
      //   token: session.accessToken,
      //   expires: 1500,
      // };
      // console.log("Sending token data:", tokenData);
      // axios.post("/api/token", tokenData).catch(console.error);
    }
  }, [status, session]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined = undefined;
    !!timeout && clearTimeout(timeout);
    const expiredTime = +(session?.expires ?? 0);
    const currentTime = Date.now();
    const timeDiff = Math.max(expiredTime - currentTime, 0);
    timeout = setTimeout(() => {
      update();
    }, timeDiff);
    return () => clearTimeout(timeout);
  }, [session?.expires]);
  return { accessToken, session };
};
