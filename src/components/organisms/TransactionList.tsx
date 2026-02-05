import React, { useMemo, useCallback } from 'react';
import { SectionList, RefreshControl, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Transaction } from '../../types/transaction';
import { TransactionItem } from '../molecules/TransactionItem';
import { groupTransactionsByYear, TransactionSection } from '../../utils/dateUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TransactionListProps {
  transactions: Transaction[];
  loading: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  onTransactionPress?: (transaction: Transaction) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  loading,
  refreshing = false,
  onRefresh,
  onTransactionPress,
}) => {
  const { t } = useTranslation();
  const {bottom} = useSafeAreaInsets()

  const sections = useMemo(
    () => groupTransactionsByYear(transactions),
    [transactions]
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: TransactionSection }) => {
      if (section.isYearHeader) {
        return (
          <Box className="py-2 bg-white">
            <Text className="text-xl font-bold text-typography-900">
              {section.year}
            </Text>
          </Box>
        );
      }
      
      return (
        <Box className="py-2 bg-white">
          <Text className="text-xs font-semibold text-typography-500 tracking-wide">
            {t('transactions.sectionDate', { date: section.date })}
          </Text>
        </Box>
      );
    },
    [t]
  );

  const renderItem = useCallback(
    ({ item }: { item: Transaction }) => (
      <TransactionItem transaction={item} onPress={onTransactionPress} />
    ),
    [onTransactionPress]
  );

  const renderEmpty = useCallback(
    () => (
      <Box className="items-center justify-center py-20">
        <Text className="text-typography-500">
          {t('transactions.noTransactions')}
        </Text>
      </Box>
    ),
    [t]
  );

  const renderFooter = useCallback(() => {
    if (!loading || transactions.length === 0) {
      return null;
    }
    return (
      <Box className="py-5 items-center">
        <ActivityIndicator size="small" />
      </Box>
    );
  }, [loading, transactions.length]);

  const keyExtractor = useCallback(
    (item: Transaction) => item.id,
    []
  );

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
      stickySectionHeadersEnabled={false}
      showsVerticalScrollIndicator={false}
    />
  );
};
