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
    if (
      status === "unauthenticated" ||
      session?.error === REFRESH_TOKEN_STATUS.FAILED
    ) {
      signIn("keycloak");
      return;
    }
    if (status === "authenticated" && session?.accessToken) {
      setAccessToken(session.accessToken);
    }
  }, [status, session?.accessToken]);

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
      {/* <p className="text-red-500">{session?.refreshToken}</p> */}
      {!!accessToken && <button onClick={() => signOut()}>Sign out</button>}
      <button onClick={() => console.log(session)}>show session</button>
    </AuthContext.Provider>
  );
}

export default AuthProvider;
