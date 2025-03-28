/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Keycloak from "keycloak-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider/AuthProvider";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const [showChildren, setShowChildren] = useState(false);
  const handleShowChildren = () => {
    setShowChildren(true);
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">MF Shell</h1>
        <p className="max-w-[500px] break-words">
          {(session as any)?.accessToken}
        </p>
        <button onClick={handleShowChildren}>Show children</button>
        {showChildren && (
          <iframe
            src="http://localhost:3001/profile"
            className="w-full h-full fixed inset-0"
          ></iframe>
        )}
      </main>
    </div>
  );
}
