import { useState, useEffect, useCallback } from 'react';
import { Transaction } from '../types/transaction';
import { getTransactionsPaginated } from '../services/transactionService';

interface UseTransactionsReturn {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  hasNextPage: boolean;
}

export const useTransactions = (): UseTransactionsReturn => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const hasNextPage = nextPage !== null;

  const fetchTransactions = useCallback(async (page: number): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getTransactionsPaginated({ page: page, perPage: 10 });      
      
      setTransactions(response.data);
      setNextPage(response.next);        
    
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions(1);
  }, [fetchTransactions]);

  return {
    transactions,
    loading,
    error,
    hasNextPage
  };
};