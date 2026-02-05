import React from 'react';
import { ScrollView } from 'react-native';
import { Box } from '@/components/ui/box';
import TransactionItemSkeleton from '../atoms/TransactionItemSkeleton';
import SectionHeaderSkeleton from '../atoms/SectionHeaderSkeleton';

const TransactionListSkeleton: React.FC = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box className="px-4">
        <SectionHeaderSkeleton isYearHeader={true} />
        <SectionHeaderSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
      </Box>

      <Box className="px-4">
        <SectionHeaderSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
      </Box>

      <Box className="px-4">
        <SectionHeaderSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
      </Box>

      <Box className="px-4">
        <SectionHeaderSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
      </Box>
    </ScrollView>
  );
};

export default TransactionListSkeleton;
