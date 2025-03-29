import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import refreshTokenKeyloack from "./functions/refreshTokenKeyloack";
import { REFRESH_TOKEN_STATUS } from "./type";

const handler = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: "p2p",
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || "",
      issuer: "https://sso.teknix.dev/realms/teknix-auth",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      const preExpiredTime = 40000; // 40 seconds
      //The first time login
      if (account && user) {
        const expiresAt = (account.expires_at ?? 0) * 1000;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expires = Math.max(expiresAt - preExpiredTime, 0);
      }
      //If the token is expired, refresh it
      if (Date.now() > +(token.expires ?? 0)) {
        const refreshedTokens = await refreshTokenKeyloack(token);
        if (refreshedTokens.status === REFRESH_TOKEN_STATUS.SUCCESS) {
          const data = refreshedTokens.data;
          const expiresAt = data?.expires_in * 1000 + Date.now();
          token.accessToken = data?.access_token;
          token.refreshToken = data?.refresh_token;
          token.expires = Math.max(expiresAt - preExpiredTime, 0);
          token.error = "";
        }
        if (refreshedTokens.status === REFRESH_TOKEN_STATUS.FAILED) {
          token.error = REFRESH_TOKEN_STATUS.FAILED;
        }
      }

      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.expires = token.expires;
        session.error = token.error;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
