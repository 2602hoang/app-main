"use client";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "../../providers/AuthProvider/AuthProvider";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  );
}

export default AuthLayout;
