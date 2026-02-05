import { renderHook, waitFor } from '@testing-library/react';
import { useTransactions } from '../useTransactions';
import { getTransactionsPaginated } from '../../services/transactionService';
import { Transaction } from '../../types/transaction';

jest.mock('../../services/transactionService');
const mockGetTransactionsPaginated = getTransactionsPaginated as jest.MockedFunction<typeof getTransactionsPaginated>;

describe('useTransactions Hook', () => {
  const mockTransactions: Transaction[] = [
    {
      id: '1',
      merchant: 'Starbucks',
      amount: -4.50,
      date: '2024-01-15T10:30:00Z',
      category: 'Food & Dining',
      type: 'expense'
    },
    {
      id: '2', 
      merchant: 'Salary',
      amount: 3000.00,
      date: '2024-01-01T00:00:00Z',
      category: 'Income',
      type: 'income'
    }
  ];

  const mockPaginatedResponse = {
    data: mockTransactions,
    first: 1,
    prev: null,
    next: null,
    last: 1,
    pages: 1,
    items: 2
  };

  const mockPaginatedResponseWithNext = {
    data: mockTransactions,
    first: 1,
    prev: null,
    next: 2,
    last: 3,
    pages: 3,
    items: 25
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetTransactionsPaginated.mockResolvedValue(mockPaginatedResponse);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Parameters and Service Calls', () => {
    it('should call service with default parameters and return correct initial state', async () => {
      const { result } = renderHook(() => useTransactions({}));

      expect(result.current.fetchState).toBe('initial-fetch');
      expect(result.current.transactions).toEqual([]);
      expect(result.current.error).toBe(null);

      await waitFor(() => {
        expect(result.current.fetchState).toBe(null);
      });

      expect(mockGetTransactionsPaginated).toHaveBeenCalledWith({
        page: 1,
        perPage: 10,
        sort: '-date',
        type: undefined,
        merchant: undefined
      });

      expect(result.current.transactions).toEqual(mockTransactions);
      expect(result.current.error).toBe(null);
      expect(result.current.fetchState).toBe(null);
    });

    it('should pass type parameter correctly', async () => {
      const { result } = renderHook(() => useTransactions({ type: 'expense' }));

      await waitFor(() => {
        expect(result.current.fetchState).toBe(null);
      });

      expect(mockGetTransactionsPaginated).toHaveBeenCalledWith({
        page: 1,
        perPage: 10,
        sort: '-date',
        type: 'expense',
        merchant: undefined
      });

      expect(result.current.transactions).toEqual(mockTransactions);
    });

    it('should pass income type parameter correctly', async () => {
      const { result } = renderHook(() => useTransactions({ type: 'income' }));

      await waitFor(() => {
        expect(result.current.fetchState).toBe(null);
      });

      expect(mockGetTransactionsPaginated).toHaveBeenCalledWith({
        page: 1,
        perPage: 10,
        sort: '-date',
        type: 'income',
        merchant: undefined
      });
    });

    it('should pass merchant parameter with debounce', async () => {
      jest.useFakeTimers();
      
      const { result } = renderHook(() => useTransactions({ merchant: 'Starbucks' }));

      expect(mockGetTransactionsPaginated).not.toHaveBeenCalled();
      expect(result.current.fetchState).toBe('initial-fetch');

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(result.current.fetchState).toBe(null);
      });

      expect(mockGetTransactionsPaginated).toHaveBeenCalledWith({
        page: 1,
        perPage: 10,
        sort: '-date',
        type: undefined,
        merchant: 'Starbucks'
      });

      expect(result.current.transactions).toEqual(mockTransactions);
      jest.useRealTimers();
    });

    it('should pass both type and merchant parameters correctly', async () => {
      jest.useFakeTimers();
      
      const { result } = renderHook(() => 
        useTransactions({ type: 'income', merchant: 'Salary' })
      );

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(result.current.fetchState).toBe(null);
      });

      expect(mockGetTransactionsPaginated).toHaveBeenCalledWith({
        page: 1,
        perPage: 10,
        sort: '-date',
        type: 'income',
        merchant: 'Salary'
      });

      expect(result.current.transactions).toEqual(mockTransactions);
      jest.useRealTimers();
    });

    it('should handle empty merchant string', async () => {
      const { result } = renderHook(() => useTransactions({ merchant: '' }));

      jest.useFakeTimers();
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(result.current.fetchState).toBe(null);
      });

      expect(mockGetTransactionsPaginated).toHaveBeenCalledWith({
        page: 1,
        perPage: 10,
        sort: '-date',
        type: undefined,
        merchant: ''
      });

      jest.useRealTimers();
    });

    it('should handle special characters in merchant name', async () => {
      jest.useFakeTimers();
      const merchantWithSpecialChars = 'McDonald\'s & Co. #1';
      
      const { result } = renderHook(() => 
        useTransactions({ merchant: merchantWithSpecialChars })
      );

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(result.current.fetchState).toBe(null);
      });

      expect(mockGetTransactionsPaginated).toHaveBeenCalledWith({
        page: 1,
        perPage: 10,
        sort: '-date',
        type: undefined,
        merchant: merchantWithSpecialChars
      });

      jest.useRealTimers();
    });

  });

  describe('Hook Methods and Return Values', () => {
    it('should provide all expected methods and properties', () => {
      const { result } = renderHook(() => useTransactions({}));

      expect(result.current).toHaveProperty('transactions');
      expect(result.current).toHaveProperty('fetchState');
      expect(result.current).toHaveProperty('error');
      expect(result.current).toHaveProperty('loadMore');
      expect(result.current).toHaveProperty('refresh');
      expect(result.current).toHaveProperty('searchWithDebounce');
      expect(result.current).toHaveProperty('fetchTransactions');

      expect(typeof result.current.loadMore).toBe('function');
      expect(typeof result.current.refresh).toBe('function');
      expect(typeof result.current.searchWithDebounce).toBe('function');
      expect(typeof result.current.fetchTransactions).toBe('function');
    });

    it('should handle loadMore correctly with pagination', async () => {
      mockGetTransactionsPaginated.mockResolvedValueOnce(mockPaginatedResponseWithNext);

      const { result } = renderHook(() => useTransactions({}));

      await waitFor(() => {
        expect(result.current.fetchState).toBe(null);
      });

      expect(result.current.transactions).toEqual(mockTransactions);

      const secondPageTransactions = [{
        id: '3',
        merchant: 'Amazon',
        amount: -25.99,
        date: '2024-01-16T12:00:00Z',
        category: 'Shopping',
        type: 'expense' as const
      }];

      mockGetTransactionsPaginated.mockResolvedValueOnce({
        data: secondPageTransactions,
        first: 1,
        prev: 1,
        next: null,
        last: 2,
        pages: 2,
        items: 3
      });

      expect(mockGetTransactionsPaginated).toHaveBeenCalledTimes(1);

      result.current.fetchTransactions(2, 'fetch-more');

      await waitFor(() => {
        expect(mockGetTransactionsPaginated).toHaveBeenCalledTimes(2);
      });

      await waitFor(() => {
        expect(result.current.fetchState).toBe(null);
      });
      
      expect(mockGetTransactionsPaginated).toHaveBeenLastCalledWith({
        page: 2,
        perPage: 10,
        sort: '-date',
        type: undefined,
        merchant: undefined
      });

      expect(result.current.transactions).toEqual([...mockTransactions, ...secondPageTransactions]);
    });

    it('should handle refresh correctly', async () => {
      mockGetTransactionsPaginated.mockResolvedValueOnce(mockPaginatedResponseWithNext);

      const { result } = renderHook(() => useTransactions({}));

      await waitFor(() => {
        expect(result.current.fetchState).toBe(null);
      });

      mockGetTransactionsPaginated.mockClear();
      mockGetTransactionsPaginated.mockResolvedValueOnce(mockPaginatedResponse);

      result.current.refresh();

      await waitFor(() => {
        expect(result.current.fetchState).toBe(null);
      });

      expect(mockGetTransactionsPaginated).toHaveBeenCalledWith({
        page: 1,
        perPage: 10,
        sort: '-date',
        type: undefined,
        merchant: undefined
      });

      expect(result.current.transactions).toEqual(mockTransactions);
    });
  });

  describe('Debounce Behavior', () => {
    it('should debounce multiple rapid merchant changes', async () => {
      jest.useFakeTimers();
      
      const { result, rerender } = renderHook(
        ({ merchant }) => useTransactions({ merchant }),
        { initialProps: { merchant: 'A' } }
      );

      rerender({ merchant: 'AB' });
      rerender({ merchant: 'ABC' });
      rerender({ merchant: 'ABCD' });

      expect(mockGetTransactionsPaginated).not.toHaveBeenCalled();
      expect(result.current.fetchState).toBe('initial-fetch');

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(result.current.fetchState).toBe(null);
      });

      expect(mockGetTransactionsPaginated).toHaveBeenCalledTimes(1);
      expect(mockGetTransactionsPaginated).toHaveBeenCalledWith({
        page: 1,
        perPage: 10,
        sort: '-date',
        type: undefined,
        merchant: 'ABCD'
      });

      expect(result.current.transactions).toEqual(mockTransactions);
      jest.useRealTimers();
    });

    it('should handle searchWithDebounce correctly', async () => {
      jest.useFakeTimers();
      
      const { result } = renderHook(() => useTransactions({ merchant: 'Test' }));

      jest.advanceTimersByTime(300);
      await waitFor(() => {
        expect(result.current.fetchState).toBe(null);
      });

      mockGetTransactionsPaginated.mockClear();
      mockGetTransactionsPaginated.mockResolvedValueOnce(mockPaginatedResponse);

      result.current.searchWithDebounce();

      expect(mockGetTransactionsPaginated).not.toHaveBeenCalled();

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(result.current.fetchState).toBe(null);
      });

      expect(mockGetTransactionsPaginated).toHaveBeenCalledWith({
        page: 1,
        perPage: 10,
        sort: '-date',
        type: undefined,
        merchant: 'Test'
      });

      jest.useRealTimers();
    });
  });

  describe('Error Handling', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should handle network errors and maintain state', async () => {
      const networkError = new Error('Network Error');
      mockGetTransactionsPaginated.mockRejectedValueOnce(networkError);

      const { result } = renderHook(() => useTransactions({}));

      expect(result.current.fetchState).toBe('initial-fetch');
      expect(result.current.transactions).toEqual([]);
      expect(result.current.error).toBe(null);

      await waitFor(() => {
        expect(result.current.error).toBe('Network Error');
        expect(result.current.fetchState).toBe(null);
      });

      expect(result.current.transactions).toEqual([]);
    });

    it('should handle errors during loadMore', async () => {
      mockGetTransactionsPaginated.mockResolvedValueOnce(mockPaginatedResponseWithNext);

      const { result } = renderHook(() => useTransactions({}));

      await waitFor(() => {
        expect(result.current.fetchState).toBe(null);
      });

      expect(result.current.transactions).toEqual(mockTransactions);

      const loadMoreError = new Error('Load More Failed');
      mockGetTransactionsPaginated.mockRejectedValueOnce(loadMoreError);

      result.current.loadMore();

      await waitFor(() => {
        expect(result.current.error).toBe('Load More Failed');
        expect(result.current.fetchState).toBe(null);
      });

      expect(result.current.transactions).toEqual(mockTransactions);
    });

    it('should clear error on successful retry', async () => {
      const error = new Error('Network Error');
      mockGetTransactionsPaginated.mockRejectedValueOnce(error);

      const { result } = renderHook(() => useTransactions({}));

      await waitFor(() => {
        expect(result.current.error).toBe('Network Error');
      });

      mockGetTransactionsPaginated.mockResolvedValueOnce(mockPaginatedResponse);

      result.current.refresh();

      await waitFor(() => {
        expect(result.current.error).toBe(null);
        expect(result.current.transactions).toEqual(mockTransactions);
      });
    });
  });

  describe('Edge Cases', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should handle empty response data', async () => {
      const emptyResponse = {
        data: [],
        first: 1,
        prev: null,
        next: null,
        last: 1,
        pages: 1,
        items: 0
      };

      mockGetTransactionsPaginated.mockResolvedValueOnce(emptyResponse);

      const { result } = renderHook(() => useTransactions({}));

      await waitFor(() => {
        expect(result.current.fetchState).toBe(null);
      });

      expect(result.current.transactions).toEqual([]);
      expect(result.current.error).toBe(null);
    });

    it('should not call loadMore when no next page exists', async () => {
      const { result } = renderHook(() => useTransactions({}));

      await waitFor(() => {
        expect(result.current.fetchState).toBe(null);
      });

      const initialCallCount = mockGetTransactionsPaginated.mock.calls.length;
      
      result.current.loadMore();

      expect(mockGetTransactionsPaginated).toHaveBeenCalledTimes(initialCallCount);
    });

    it('should handle parameter changes after mount', async () => {
      const { result, rerender } = renderHook(
        ({ type }: { type?: 'expense' | 'income' }) => useTransactions({ type }),
        { initialProps: { type: 'expense' as const } }
      );

      await waitFor(() => {
        expect(result.current.fetchState).toBe(null);
      });

      expect(mockGetTransactionsPaginated).toHaveBeenLastCalledWith({
        page: 1,
        perPage: 10,
        sort: '-date',
        type: 'expense',
        merchant: undefined
      });

      rerender({ type: 'income' });

      await waitFor(() => {
        expect(mockGetTransactionsPaginated).toHaveBeenLastCalledWith({
          page: 1,
          perPage: 10,
          sort: '-date',
          type: 'income',
          merchant: undefined
        });
      });
    });
  });
});
