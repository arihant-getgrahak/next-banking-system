import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatDate from "@/helper/formatDate";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Transaction } from "@prisma/client";
import { DashboardType } from "@/types/userType";
import Link from "next/link";

export function AllTransaction({
  transactionData,
  userdata,
}: {
  transactionData: Transaction[];
  userdata: DashboardType;
}) {
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            All transactions from your account.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction Info</TableHead>
              <TableHead className="hidden xl:table-column">Type</TableHead>
              <TableHead className="hidden xl:table-column">Status</TableHead>
              <TableHead className="hidden xl:table-column">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactionData?.map((data) => (
              <TableRow>
                <TableCell>
                  <div className="font-sm">
                    {formatDate(data?.transfer_date)}
                  </div>
                  <div className="font-medium">
                    {data.type + "/" + userdata?.name + "/" + data.id}
                  </div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {data.type + "-" + data.id}
                  </div>
                </TableCell>

                <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                  {formatDate(data.transfer_date)}
                </TableCell>
                {data.method === "CREDIT" ? (
                  <TableCell className="text-right">
                    {`+ ₹${data.amount}`}
                  </TableCell>
                ) : (
                  <TableCell className="text-right text-red-500">
                    {`- ₹${data.amount}`}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
