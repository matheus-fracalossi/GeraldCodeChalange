import React from 'react';
import { ScrollView } from 'react-native';
import { Box } from '@/components/ui/box';
import TransactionItemSkeleton from '../atoms/TransactionItemSkeleton';
import SectionHeaderSkeleton from '../atoms/SectionHeaderSkeleton';

const TransactionListSkeleton: React.FC = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* First section with year header */}
      <Box className="px-4">
        <SectionHeaderSkeleton isYearHeader={true} />
        <SectionHeaderSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
      </Box>

      {/* Second section */}
      <Box className="px-4">
        <SectionHeaderSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
      </Box>

      {/* Third section */}
      <Box className="px-4">
        <SectionHeaderSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
      </Box>

      {/* Fourth section */}
      <Box className="px-4">
        <SectionHeaderSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
      </Box>
    </ScrollView>
  );
};

export default TransactionListSkeleton;
