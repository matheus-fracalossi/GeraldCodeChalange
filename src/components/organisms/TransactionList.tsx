import React, { useMemo, useCallback } from "react";
import { SectionList, RefreshControl } from "react-native";
import { useTranslation } from "react-i18next";
import { Box, Text } from "@/components/atoms";
import { Transaction } from "../../types/transaction";
import { TransactionItem } from "../molecules/TransactionItem";
import {
  groupTransactionsByYear,
  TransactionSection,
} from "../../utils/dateUtils";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TransactionListSkeleton from "./TransactionListSkeleton";
import TransactionItemSkeleton from "../atoms/TransactionItemSkeleton";
import EmptyState from "../molecules/EmptyState";

interface TransactionListProps {
  transactions: Transaction[];
  loading: boolean;
  loadingMore?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  onClearFilters?: () => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  loading,
  loadingMore = false,
  refreshing = false,
  onRefresh,
  onLoadMore,
  onClearFilters,
}) => {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();

  const sections = useMemo(
    () => groupTransactionsByYear(transactions),
    [transactions],
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: TransactionSection }) => {
      if (section.isYearHeader) {
        return (
          <Box className="py-2">
            <Text className="text-xl font-bold text-typography-900">
              {section.year}
            </Text>
          </Box>
        );
      }

      return (
        <Box className="py-2">
          <Text className="text-xs font-semibold text-typography-500 tracking-wide">
            {t("transactions.sectionDate", { date: section.date })}
          </Text>
        </Box>
      );
    },
    [t],
  );

  const renderItem = useCallback(
    ({ item }: { item: Transaction }) => <TransactionItem transaction={item} />,
    [],
  );

  const renderEmpty = useCallback(
    () => (
      <EmptyState
        titleKey="transactions.noTransactions"
        descriptionKey="transactions.noTransactionsDescription"
        buttonTextKey={onClearFilters ? "transactions.clearFilters" : undefined}
        onButtonPress={onClearFilters}
        buttonAccessibilityLabel={t("transactions.clearFiltersAccessibility")}
        buttonAccessibilityHint={t("transactions.clearFiltersHint")}
      />
    ),
    [onClearFilters, t],
  );

  const renderFooter = useCallback(() => {
    if (loadingMore) {
      return (
        <Box>
          <TransactionItemSkeleton />
          <TransactionItemSkeleton />
        </Box>
      );
    }
    return null;
  }, [loadingMore]);

  const keyExtractor = (item: Transaction, index: number) =>
    `${item.id}-${index}`;

  if (loading) {
    return <TransactionListSkeleton />;
  }

  return (
    <SectionList
      sections={sections}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.1}
      stickySectionHeadersEnabled={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      contentContainerStyle={{
        paddingBottom: bottom,
        flexGrow: sections.length ? 0 : 1,
      }}
      getItemLayout={(_, index) => ({ length: 88, offset: 88 * index, index })}
    />
  );
};
