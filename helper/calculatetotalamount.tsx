import { Transaction } from "@prisma/client";

export const totalamountReceived = (data: Transaction[] = []): number => {
  const amountReceived = data
    .filter((transaction) => transaction.method === "CREDIT")
    .reduce((total, transaction) => total + (transaction.amount ?? 0), 0);

  return amountReceived;
};

export let totalAmountSent = (data: Transaction[] = []): number => {
  const amountSent = data
    .filter((transaction) => transaction.method === "DEBIT")
    .reduce((total, transaction) => total + (transaction.amount ?? 0), 0);

  return amountSent;
};

export function totalAmount(
  transRec: Transaction[] = [],
  transsent: Transaction[] = []
) {
  const amountSent = transsent.reduce((total, transaction) => {
    return total + transaction.amount;
  }, 0);
  const amountReceived = transRec.reduce((total, transaction) => {
    return total + transaction.amount;
  }, 0);

  return amountReceived - amountSent;
}
