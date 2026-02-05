import React, { useState, useCallback } from 'react';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import './global.css';
import { StatusBar, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Box } from '@/components/ui/box';
import { useTransactions } from './src/hooks/useTransactions';
import { SearchInput } from './src/components/molecules/SearchInput';
import { FilterBar } from './src/components/molecules/FilterBar';
import { TransactionList } from './src/components/organisms/TransactionList';
import { TransactionFilter } from '@/types/transaction';
import ErrorState from './src/components/molecules/ErrorState';

const App = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const isDarkMode = colorScheme === 'dark';

  return (
    <GluestackUIProvider mode={colorScheme}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaProvider>
        <TransactionScreen />
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
};

const TransactionScreen = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<TransactionFilter>('all');

  const { transactions, fetchState, error, loadMore, refresh } = useTransactions({type: filterType === 'all' ? undefined : filterType, merchant: searchQuery});

  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const handleFilterChange = useCallback((newFilter: TransactionFilter) => {
    setFilterType(newFilter);
  }, []);

  const handleRetry = useCallback(() => {
    refresh();
  }, [refresh]);

  if (error) {
    return (
      <Box
        className="flex-1 bg-white"
        style={{ paddingTop: safeAreaInsets.top }}
      >
        <ErrorState onRetry={handleRetry} />
      </Box>
    );
  }

  return (
    <Box
      className="flex-1 bg-white px-4"
      style={{ paddingTop: safeAreaInsets.top }}
    >
      <SearchInput value={searchQuery} onChangeText={handleSearchChange} />

      <FilterBar currentFilter={filterType} onFilterChange={handleFilterChange} />

      <TransactionList
        transactions={transactions}
        loading={fetchState === 'initial-fetch'}
        loadingMore={fetchState === 'fetch-more'}
        refreshing={fetchState === 'refreshing'}
        onRefresh={refresh}
        onLoadMore={loadMore}
        onClearFilters={() => {
          setSearchQuery('');
          setFilterType('all');
        }}
      />
    </Box>
  );
};

export default App;
