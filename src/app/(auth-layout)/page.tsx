/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Keycloak from "keycloak-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import { signOut, useSession } from "next-auth/react";
import ProfileData from "@/components/ProfileData";
import axios from "axios";
import { useToken } from "@/hooks/useToken";
import { log } from "console";

export default function Home() {
  const { data: session } = useSession();
  const [showChildren, setShowChildren] = useState(false);
  const {accessToken}=useToken();
  const handleShowChildren = () => {
    setShowChildren(true);
  };
  console.log("accessToken", accessToken);
  
  const handleLogout = async () => {
    try {
      await axios.post(
        "https://p2p-gateway-sandbox.up.railway.app/api/v1/auth/logout",
        null,
        {
          headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      signOut();
      localStorage.clear();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">MF Shell</h1>
        <button onClick={handleLogout}>Logout</button>
        <p className="max-w-[500px] break-words">
          {(session as any)?.accessToken}
        </p>
        <ProfileData/>
      </main>
    </div>
  );
}
