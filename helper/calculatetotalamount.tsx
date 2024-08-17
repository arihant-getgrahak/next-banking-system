import { Transaction } from "@prisma/client";

export const totalamountReceived = (data: Transaction[] = []): number => {
  const amountReceived = data.reduce((total, transaction) => {
    return total + transaction.amount;
  }, 0);

  return amountReceived;
};
export let totalAmountSent = (data: Transaction[] = []): number => {
  const amountSent = data.reduce((total, transaction) => {
    return total + transaction.amount;
  }, 0);

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
