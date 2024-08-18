"use client";
import { Card, CardContent } from "@/components/ui/card";
import { AggregatedDataType, TransactionType } from "@/types/formatData";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { processData } from "@/helper/processData";
import { useState, useEffect } from "react";

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

export function Overview({
  transactionData,
}: {
  transactionData: TransactionType[];
}) {
  const [data, setData] = useState<AggregatedDataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await processData(transactionData);
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardContent className="grid gap-8 p-4">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart width={500} height={300} data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="credit" stroke="#8884d8" />
            <Line type="monotone" dataKey="debit" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
