import { Transaction } from "@prisma/client";

export const totalamountReceived = (data: Transaction[] = []): number => {
  const totalamountReceived = data.reduce((total, transaction) => {
    return total + transaction.amount;
  }, 0);

  return totalamountReceived;
};
export let totalAmountSent = (data: Transaction[] = []): number => {
  const totalAmountSent = data.reduce((total, transaction) => {
    return total + transaction.amount;
  }, 0);

  return totalAmountSent;
};
