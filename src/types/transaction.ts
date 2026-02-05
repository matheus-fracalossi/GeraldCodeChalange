export interface Transaction {
  id: string;
  merchant: string;
  amount: number; // positive=income, negative=expenses
  date: string; // ISO 8601 format
  category: string;
  type: "income" | "expense";
}

export type TransactionFilter = "all" | "income" | "expense";

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export interface TransactionListState {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  filter: TransactionFilter;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  isRefreshing: boolean;
}

export interface TransactionItemProps {
  transaction: Transaction;
  onPress?: (transaction: Transaction) => void;
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
