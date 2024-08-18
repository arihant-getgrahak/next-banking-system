"use client";

import { DashboardApi, TransactionApi } from "@/helper/api";
import { Transaction } from "@prisma/client";
import { useState, useEffect } from "react";
import { DashboardType } from "@/types/userType";
import { DashboardCard, RecentTransaction } from "./component";
import { Overview } from "./component/overview";
import { TransactionType } from "@/types/transactionType";

export function Dashboard(props: { email: string }) {
  const [userdata, setUserData] = useState<DashboardType>();
  const [transactionData, setTransactionData] = useState<TransactionType[]>([]);
  async function fetchData() {
    const res = await DashboardApi(props.email);
    setUserData(res?.data.data);

    await fetchTransaction(res?.data.data?.account_no);
  }

  async function fetchTransaction(account_no: string) {
    const res = await TransactionApi(account_no);
    setTransactionData(res?.data.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // console.log("userData: ", userdata?.sentTransaction);
  // console.log("userData R: ", userdata?.receivedTransaction);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <DashboardCard userdata={userdata!} />
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <RecentTransaction
            transactionData={transactionData}
            userdata={userdata!}
          />
          <Overview transactionData={transactionData} />
        </div>
      </main>
    </div>
  );
}
