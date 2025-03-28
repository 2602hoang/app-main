"use client";
import { createContext, useEffect, useState } from "react";
import Keycloak from "keycloak-js";
import { AuthContextType } from "./type";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [keycloak, setKeycloak] =
    useState<AuthContextType["keycloak"]>(undefined);
  const [isAuthenticated, setIsAuthenticated] =
    useState<AuthContextType["isAuthenticated"]>(false);
  const [accessToken, setAccessToken] =
    useState<AuthContextType["accessToken"]>(undefined);
  const [refreshToken, setRefreshToken] =
    useState<AuthContextType["refreshToken"]>(undefined);

  useEffect(() => {
    const kc = new Keycloak({
      url: "https://sso.teknix.dev",
      realm: "teknix-auth",
      clientId: "p2p",
    });
    console.log("🚀 ~ useEffect ~ kc:", kc);

    kc.init({
      onLoad: "login-required",
      pkceMethod: "S256",
      enableLogging: true,
      checkLoginIframe: false,
      flow: "standard",
    }).then((authenticated) => {
      console.log("🚀 ~ kc.init ~ authenticated:", authenticated);
      setKeycloak(kc);
      setIsAuthenticated(authenticated);
      if (authenticated) {
        setAccessToken(kc.token);
        setRefreshToken(kc.refreshToken);
        // localStorage.setItem("keycloak-token", kc.token ?? "");
        // localStorage.setItem("keycloak-refresh-token", kc.refreshToken ?? "");
      }
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{ keycloak, isAuthenticated, accessToken, refreshToken }}
    >
      {!!accessToken && children}
      {!accessToken && <div>Login...</div>}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
