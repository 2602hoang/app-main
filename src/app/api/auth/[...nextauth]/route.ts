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
      console.log("🚀🚀🚀🚀🚀🚀🚀 ~ jwt ~ token:", token, user, account);
      //The first time login
      if (account && user) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expires = (account.expires_at ?? 0) * 1000;
      }
      //If the token is expired, refresh it
      if (Date.now() > +(token.expires ?? 0)) {
        // const refreshResponse = await refreshTokenKeyloack(token);
        const refreshedTokens = await refreshTokenKeyloack(token);
        console.log("🚀 ~ jwt ~ refreshedTokens:", refreshedTokens);
        if (refreshedTokens.status === REFRESH_TOKEN_STATUS.SUCCESS) {
          const data = refreshedTokens.data;
          token.accessToken = data?.access_token;
          token.refreshToken = data?.refresh_token;
          token.expires = data?.expires_in * 1000 + Date.now();
        }
        if (refreshedTokens.status === REFRESH_TOKEN_STATUS.FAILED) {
          token.error = REFRESH_TOKEN_STATUS.FAILED;
        }
      }

      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        const expiresAt = token.expires;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.expires = Math.max(expiresAt - 60000, expiresAt); // 1 minute before expired
        session.error = token.error;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
