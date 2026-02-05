import React from 'react';
import { Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { TransactionItemProps } from '../../types/transaction';
import { getCategoryEmoji } from '../../utils/categoryEmoji';

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onPress,
}) => {
  const { t } = useTranslation();
  const isIncome = transaction.type === 'income';
  const emoji = getCategoryEmoji(transaction.category);
  const categories = t(`categories`, { returnObjects: true })

  const handlePress = () => {
    onPress?.(transaction);
  };

  return (
    <Pressable
      onPress={handlePress}
      className="flex-row items-center py-4 px-1"
      accessibilityRole="button"
      accessibilityLabel={t('transactions.transactionSummary', {
        merchant: transaction.merchant,
        date: transaction.date,
        amount: transaction.amount,
      })}
    >
      <Box className="w-12 h-12 rounded-lg bg-background-100 items-center justify-center mr-3">
        <Text className="text-2xl">{emoji}</Text>
      </Box>

      <Box className="flex-1">
        <Text className="text-base font-semibold text-typography-900">
          {transaction.merchant}
        </Text>
        <Text className="text-sm text-typography-500">
          {categories[transaction.category as keyof typeof categories]}
        </Text>
      </Box>

      <Text
        className={`text-base font-semibold ${
          isIncome ? 'text-success-600' : 'text-error-600'
        }`}
      >
        {t('transactions.transactionAmount', { amount: transaction.amount })}
      </Text>
    </Pressable>
  );
};
