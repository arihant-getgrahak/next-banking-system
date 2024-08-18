import { AggregatedDataType, TransactionType } from "@/types/formatData";

type dataMap = Record<string, AggregatedDataType>;
export async function processData(transaction: TransactionType[]) {
  const dataMap: dataMap = {};

  transaction.forEach((transaction) => {
    const { date, type, amount } = transaction;

    if (!dataMap[date]) {
      dataMap[date] = { date, credit: 0, debit: 0 };
    }

    if (type === "credit" || type === "debit") {
      dataMap[date][type] += amount;
    }
  });

  const data = Object.values(dataMap);

  console.log("Processed Data:", data);

  return data;
}
