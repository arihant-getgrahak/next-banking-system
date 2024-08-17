"use client";

import { DashboardApi, TransactionApi } from "@/helper/api";
import { Transaction } from "@prisma/client";
import { useState, useEffect } from "react";
import { DashboardType } from "@/types/userType";
import { DashboardCard, RecentTransaction } from "./component";

export function Dashboard(props: { email: string }) {
  const [userdata, setUserData] = useState<DashboardType>();
  const [transactionData, setTransactionData] = useState<Transaction[]>([]);
  async function fetchData() {
    const res = await DashboardApi(props.email);
    setUserData(res?.data.data);

    await fetchTransaction(res?.data.data?.id);
  }

  async function fetchTransaction(id: string) {
    const res = await TransactionApi(id);
    setTransactionData(res?.data.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <DashboardCard userdata={userdata!} />
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <RecentTransaction
            transactionData={transactionData}
            userdata={userdata!}
          />
        </div>
      </main>
    </div>
  );
}
