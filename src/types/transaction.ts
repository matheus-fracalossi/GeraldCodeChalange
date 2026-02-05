export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  category: string;
  type: "income" | "expense";
}

export type TransactionFilter = "all" | "income" | "expense";


export interface TransactionItemProps {
  transaction: Transaction;
}

export interface FilterBarProps {
  currentFilter: TransactionFilter;
  onFilterChange: (filter: TransactionFilter) => void;
}

export interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}
