import { Transaction } from '../types/transaction';

export interface TransactionSection {
  title: string;
  date: string;
  data: Transaction[];
}

export const groupTransactionsByDate = (
  transactions: Transaction[]
): TransactionSection[] => {
  const grouped = transactions.reduce<Record<string, Transaction[]>>(
    (acc, transaction) => {
      const date = new Date(transaction.date);
      const dateKey = date.toISOString().split('T')[0];
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(transaction);
      return acc;
    },
    {}
  );

  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return sortedDates.map((dateKey) => ({
    title: dateKey,
    date: dateKey,
    data: grouped[dateKey],
  }));
};
