"use client";

import { DashboardApi, TransactionApi } from "@/helper/api";
import getUserInfo from "@/helper/getuserinfofromtoken";
import { JwtType } from "@/types/jwtPayload";
import { DashboardType } from "@/types/userType";
import { useState, useEffect } from "react";
import TransferCard from "./component/transferCard";
import { checkIsLogin } from "@/helper/checkAuth";

export default function TransferPage() {
  if (!checkIsLogin()) {
    return <h1>Unauthorized</h1>;
  }
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
