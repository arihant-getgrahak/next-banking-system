"use client";
import { DashboardApi } from "@/helper/api";
import { useState } from "react";
import { User } from "@prisma/client";

export default function Dashboard(props: { name: string }) {
  const [userdata, setUserData] = useState<User | null>(null);
  async function ff() {
    const res = await DashboardApi(props.name);
    setUserData(res?.data.data);
  }
  
  return (
    <>
      <h1>Dashboard for {props.name}</h1>
      {userdata && (
        <>
          <h2>{userdata.name}</h2>
          <h2>{userdata.email}</h2>
          <h2>{userdata.password}</h2>
          <h2>{userdata.account_no}</h2>
        </>
      )}
      <button onClick={ff}>CLick me</button>
    </>
  );
}
