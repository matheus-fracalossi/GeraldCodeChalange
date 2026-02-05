import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input, InputField, InputSlot } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { SearchInputProps } from '../../types/transaction';

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder,
}) => {
  const { t } = useTranslation();

  return (
    <Input
      variant="outline"
      size="lg"
      className="bg-white border-background-200 rounded-xl"
    >
      <InputSlot className="pl-3">
        <Text className="text-typography-400">🔍</Text>
      </InputSlot>
      <InputField
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || t('transactions.searchPlaceholder')}
        className="text-typography-900"
        accessibilityLabel={t('transactions.searchPlaceholder')}
      />
    </Input>
  );
};
