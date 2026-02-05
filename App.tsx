import React, { useState, useMemo, useCallback } from 'react';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import './global.css';
import { StatusBar, useColorScheme, ActivityIndicator } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { useTransactions } from './src/hooks/useTransactions';
import { Transaction, TransactionFilter } from './src/types/transaction';
import { SearchInput } from './src/components/molecules/SearchInput';
import { FilterBar } from './src/components/molecules/FilterBar';
import { TransactionList } from './src/components/organisms/TransactionList';

const App = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const isDarkMode = colorScheme === 'dark';

  return (
    <GluestackUIProvider mode={colorScheme}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
};

const AppContent = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { transactions, loading, error } = useTransactions();

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<TransactionFilter>('all');

  const filteredTransactions = useMemo(() => {
    let result = transactions;

    if (filter !== 'all') {
      result = result.filter((tx) => tx.type === filter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((tx) =>
        tx.merchant.toLowerCase().includes(query)
      );
    }

    return result;
  }, [transactions, filter, searchQuery]);

  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const handleFilterChange = useCallback((newFilter: TransactionFilter) => {
    setFilter(newFilter);
  }, []);

  const handleTransactionPress = useCallback((transaction: Transaction) => {
    console.log('Transaction pressed:', transaction.id);
  }, []);

  if (loading && transactions.length === 0) {
    return (
      <Box className="flex-1 items-center justify-center p-5 bg-white">
        <ActivityIndicator size="large" />
        <Text className="mt-3 text-base text-typography-500">
          {t('common.loading')}
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="flex-1 items-center justify-center p-5 bg-white">
        <Text className="text-base text-error-600 text-center">{error}</Text>
      </Box>
    );
  }

  return (
    <Box
      className="flex-1 bg-white px-4"
      style={{ paddingTop: safeAreaInsets.top }}
    >
      <SearchInput value={searchQuery} onChangeText={handleSearchChange} />

      <FilterBar currentFilter={filter} onFilterChange={handleFilterChange} />

      <TransactionList
        transactions={filteredTransactions}
        loading={loading}
        onTransactionPress={handleTransactionPress}
      />
    </Box>
  );
};

export default App;
