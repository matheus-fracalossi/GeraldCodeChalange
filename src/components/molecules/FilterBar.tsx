import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, ButtonText } from '@/components/ui/button';
import { Box } from '@/components/ui/box';
import { FilterBarProps, TransactionFilter } from '../../types/transaction';

interface FilterOption {
  key: TransactionFilter;
  labelKey: 'common.all' | 'transactions.income' | 'transactions.expenses';
}

const FILTER_OPTIONS: FilterOption[] = [
  { key: 'all', labelKey: 'common.all' },
  { key: 'income', labelKey: 'transactions.income' },
  { key: 'expense', labelKey: 'transactions.expenses' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  const { t } = useTranslation();

  const renderFilterItem = useCallback(
    ({ item }: { item: FilterOption }) => {
      const isActive = currentFilter === item.key;
      return (
        <Button
          variant={isActive ? 'solid' : 'outline'}
          action={isActive ? 'primary' : 'secondary'}
          size="sm"
          className={`rounded-full px-5 mr-2 ${
            isActive
              ? 'bg-primary-500'
              : 'bg-white border-background-300'
          }`}
          onPress={() => onFilterChange(item.key)}
          accessibilityLabel={t(item.labelKey)}
          accessibilityRole="button"
        >
          <ButtonText
            className={isActive ? 'text-white' : 'text-typography-700'}
          >
            {t(item.labelKey)}
          </ButtonText>
        </Button>
      );
    },
    [currentFilter, onFilterChange, t]
  );

  const keyExtractor = useCallback(
    (item: FilterOption) => item.key,
    []
  );

  return (
    <Box className="py-3">
      <FlatList
        data={FILTER_OPTIONS}
        renderItem={renderFilterItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      />
    </Box>
  );
};
