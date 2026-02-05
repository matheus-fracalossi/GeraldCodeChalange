import React, { useState, useCallback } from "react";
import { GluestackUIProvider } from "@/components/atoms/gluestack-ui-provider";
import "./global.css";
import { StatusBar, KeyboardAvoidingView, Platform } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Box } from "@/components/atoms/box";
import { useTransactions } from "./src/hooks/useTransactions";
import { SearchInput } from "./src/components/molecules/SearchInput";
import { FilterBar } from "./src/components/molecules/FilterBar";
import { TransactionList } from "./src/components/organisms/TransactionList";
import { TransactionFilter } from "@/types/transaction";
import ErrorState from "./src/components/molecules/ErrorState";

const App = () => {
  return (
    <GluestackUIProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaProvider>
        <TransactionScreen />
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
};

const TransactionScreen = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<TransactionFilter>("all");

  const {
    transactions,
    fetchState,
    error,
    loadMore,
    refresh,
    fetchTransactions,
  } = useTransactions({
    type: filterType === "all" ? undefined : filterType,
    merchant: searchQuery,
  });

  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const handleFilterChange = useCallback((newFilter: TransactionFilter) => {
    setFilterType(newFilter);
  }, []);

  const handleRetry = useCallback(() => {
    fetchTransactions(1, "initial-fetch");
  }, [fetchTransactions]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Box className="flex-1 px-4" style={{ paddingTop: safeAreaInsets.top }}>
        {error ? (
          <ErrorState onRetry={handleRetry} />
        ) : (
          <>
            <SearchInput
              value={searchQuery}
              onChangeText={handleSearchChange}
            />

            <FilterBar
              currentFilter={filterType}
              onFilterChange={handleFilterChange}
            />

            <TransactionList
              transactions={transactions}
              loading={fetchState === "initial-fetch"}
              loadingMore={fetchState === "fetch-more"}
              refreshing={fetchState === "refreshing"}
              onRefresh={refresh}
              onLoadMore={loadMore}
              onClearFilters={() => {
                setSearchQuery("");
                setFilterType("all");
              }}
            />
          </>
        )}
      </Box>
    </KeyboardAvoidingView>
  );
};

export default App;
