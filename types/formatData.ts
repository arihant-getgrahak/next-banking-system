export type AggregatedDataType = {
  date: string;
  credit: number;
  debit: number;
};
export type TransactionType = {
  date: string,
  id: string;
  amount: number;
  type: string;
  method: string;
  acc_no: string;
}