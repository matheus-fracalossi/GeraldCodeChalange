import { useState, useEffect, useCallback, useRef } from 'react';
import { Transaction } from '../types/transaction';
import { getTransactionsPaginated } from '../services/transactionService';

type FetchState = 'initial-fetch' | 'fetch-more' | 'refreshing' | null;

interface UseTransactionsReturn {
  transactions: Transaction[];
  fetchState: FetchState;
  error: string | null;
  loadMore: () => void;
  refresh: () => void;
  searchWithDebounce: () => void;
  fetchTransactions: (page: number, fetchType: FetchState) => void;
}

export const useTransactions = ({type, merchant}: {type?: Transaction['type'], merchant?: Transaction["merchant"]}): UseTransactionsReturn => {
  const [fetchState, setFetchState] = useState<FetchState>('initial-fetch');
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const nextPageRef = useRef<number | null>(null);
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasNextPage = nextPageRef.current !== null;

  const fetchTransactions = useCallback(async (page: number, fetchType: FetchState): Promise<void> => {
    setFetchState(fetchType);
    setError(null);
    
    try {
      const response = await getTransactionsPaginated({ page: page, perPage: 10, sort: '-date', type, merchant });

      
      if (fetchType === "fetch-more") {
        setTransactions(prev => [...prev, ...response.data]);
      } else {
        setTransactions(response.data);
      }

      nextPageRef.current = response.next;    
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
      console.log(err);
      
    } finally {
      setFetchState(null);
    }
  }, [type, merchant]);

  const debouncedFetchTransactions = useCallback((page: number, fetchType: FetchState, delay: number = 300) => {
    setFetchState(fetchType);
    setError(null);
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      fetchTransactions(page, fetchType);
    }, delay);
  }, [fetchTransactions]);

  const loadMore = useCallback(() => {
    if (hasNextPage && fetchState === null) {
      fetchTransactions(nextPageRef.current!, 'fetch-more');
    }
  }, [hasNextPage, fetchState, fetchTransactions]);

  const refresh = useCallback(() => {
    nextPageRef.current = null;
    fetchTransactions(1, 'refreshing');
  }, [fetchTransactions]);

  const searchWithDebounce = useCallback(() => {
    nextPageRef.current = null;
    debouncedFetchTransactions(1, 'initial-fetch');
  }, [debouncedFetchTransactions]);

  useEffect(() => {
    if (merchant) {
      debouncedFetchTransactions(1, 'initial-fetch');
    } else {
      fetchTransactions(1, 'initial-fetch');
    }

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [fetchTransactions, debouncedFetchTransactions, merchant]);

  return {
    transactions,
    fetchState,
    error,
    loadMore,
    refresh,
    searchWithDebounce,
    fetchTransactions,
  };
};