import { Transaction } from '../types/transaction';

export interface TransactionSection {
  title: string;
  date: string;
  data: Transaction[];
  isYearHeader?: boolean;
  year?: string;
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

export const groupTransactionsByYear = (
  transactions: Transaction[]
): TransactionSection[] => {
  const yearGroups = transactions.reduce<Record<string, Transaction[]>>(
    (acc, transaction) => {
      const date = new Date(transaction.date);
      const year = date.getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(transaction);
      return acc;
    },
    {}
  );

  const sortedYears = Object.keys(yearGroups).sort((a, b) => parseInt(b, 10) - parseInt(a, 10));
  
  const flatSections: TransactionSection[] = [];
  
  sortedYears.forEach((year) => {
    flatSections.push({
      title: year,
      date: year,
      year,
      data: [],
      isYearHeader: true,
    });
    
    const yearTransactions = yearGroups[year];
    const dateSections = groupTransactionsByDate(yearTransactions);
    
    dateSections.forEach((section) => {
      flatSections.push({
        ...section,
        year,
      });
    });
  });
  
  return flatSections;
};
