"use client"

import { DashboardApi, TransactionApi } from "@/helper/api";
import getUserInfo from "@/helper/getuserinfofromtoken";
import { JwtType } from "@/types/jwtPayload";
import { DashboardType } from "@/types/userType";
import { useState, useEffect } from "react";
import TransferCard from "./component/transferCard";

export default function TransferPage() {
  const [userdata, setUserData] = useState<DashboardType>();

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
  return userdata && <TransferCard userData={userdata} />;
}
