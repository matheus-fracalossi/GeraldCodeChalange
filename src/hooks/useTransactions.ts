import { useState, useEffect, useCallback, useRef } from 'react';
import { Transaction } from '../types/transaction';
import { getTransactionsPaginated } from '../services/transactionService';

type FetchState = 'initial-fetch' | 'fetch-more' | 'refreshing' | null;

interface UseTransactionsReturn {
  transactions: Transaction[];
  fetchState: FetchState;
  error: string | null;
  hasNextPage: boolean;
  loadMore: () => void;
  refresh: () => void;
}

export const useTransactions = ({type}: {type?: Transaction['type']}): UseTransactionsReturn => {
  const [fetchState, setFetchState] = useState<FetchState>('initial-fetch');
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const nextPageRef = useRef<number | null>(null);
  const hasNextPage = nextPageRef.current !== null;

  const fetchTransactions = useCallback(async (page: number, fetchState: FetchState): Promise<void> => {
    try {
      setFetchState(fetchState);
      setError(null);
      
      const response = await getTransactionsPaginated({ page: page, perPage: 10, sort: '-date', type });      
      
      if (fetchState === "fetch-more") {
        setTransactions(prev => [...prev, ...response.data]);
      } else {
        setTransactions(response.data);
      }

      nextPageRef.current = response.next;    
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
    } finally {
      setFetchState(null);
    }
  }, [type]);

  const loadMore = useCallback(() => {
    if (hasNextPage && fetchState === null) {
      fetchTransactions(nextPageRef.current!, 'fetch-more');
    }
  }, [fetchState, fetchTransactions]);

  const refresh = useCallback(() => {
    nextPageRef.current = null;
    fetchTransactions(1, 'refreshing');
  }, [fetchTransactions]);

  useEffect(() => {
    fetchTransactions(1, 'initial-fetch');
  }, [fetchTransactions, type]);

  return {
    transactions,
    fetchState,
    error,
    hasNextPage,
    loadMore,
    refresh
  };
};