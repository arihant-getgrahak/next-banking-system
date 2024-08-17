"use client";

import { DashboardApi } from "@/helper/api";
import getUserInfo from "@/helper/getuserinfofromtoken";
import { JwtType } from "@/types/jwtPayload";
import { User } from "@prisma/client";
import { useState, useEffect } from "react";
import ProfileCard from "./component/profileCard";

export default function ProfilePage() {
  const [userdata, setUserData] = useState<User>();

  async function fetchData(email: string) {
    const res = await DashboardApi(email);
    setUserData(res?.data.data);
  }

  useEffect(() => {
    async function initialize() {
      const token = getUserInfo() as JwtType;
      const email = token?.data?.email;
      if (email) {
        await fetchData(email);
      }
    }
    initialize();
  }, []);

  return (
    <main>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mt-2 p-4">
        <ProfileCard userData={userdata!} />
      </div>
    </main>
  );
}
