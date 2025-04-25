"use client";
import { createContext, } from "react";
import {  AuthContextType } from "./type";
import {  signOut } from "next-auth/react";
import axios from "axios";
import { useToken } from "@/hooks/useToken";



export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const {accessToken, session} = useToken();

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
      <div className="flex flex-col justify-center items-center">
        <a href="/app-1" > Go to app 1</a>
        <a href="/app-2" > Go to app 2</a>
        </div>
    </AuthContext.Provider>
  );
}

export default AuthProvider;
