"use client";
import { createContext, useEffect, useState } from "react";
import { AccessToken, AuthContextType } from "./type";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import { REFRESH_TOKEN_STATUS } from "@/app/api/auth/[...nextauth]/type";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<AccessToken>(undefined);
  const { data: session, update, status } = useSession();
  useEffect(() => {
    console.log("🚀 ~ useEffect ~ session:", session);
    let timeout: NodeJS.Timeout | undefined;
    if (
      status === "unauthenticated" ||
      session?.error === REFRESH_TOKEN_STATUS.FAILED
    ) {
      signIn("keycloak");
      return;
    }
    if (status === "authenticated" && session?.accessToken) {
      setAccessToken(session.accessToken);
      const expiredTime = +session.expires;
      const currentTime = Date.now();
      const timeDiff = expiredTime - currentTime;
      !!timeout && clearTimeout(timeout);
      timeout = setTimeout(() => {
        update();
      }, timeDiff);
    }
    return () => clearTimeout(timeout);
  }, [session?.accessToken, status, session?.error, session?.expires]);

  const getProfile = async () => {
    const response = await axios.get(
      "https://p2p-gateway-sandbox.up.railway.app/api/v1/users/profile",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("🚀 ~ getProfile ~ response:", response);
  };

  return (
    <AuthContext.Provider value={{ accessToken }}>
      <button onClick={getProfile}>get profile</button>
      {!!accessToken && children}
      {!!accessToken && <button onClick={() => signOut()}>Sign out</button>}
      <button onClick={() => console.log(session)}>show session</button>
    </AuthContext.Provider>
  );
}

export default AuthProvider;
