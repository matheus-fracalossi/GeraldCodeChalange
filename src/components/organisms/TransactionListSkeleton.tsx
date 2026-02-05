import React from "react";
import { ScrollView } from "react-native";
import { Box } from "@/components/atoms";
import TransactionItemSkeleton from "../atoms/TransactionItemSkeleton";
import SectionHeaderSkeleton from "../atoms/SectionHeaderSkeleton";

const TransactionListSkeleton: React.FC = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box>
        <SectionHeaderSkeleton isYearHeader={true} />
        <SectionHeaderSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
      </Box>

      <Box>
        <SectionHeaderSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
      </Box>

      <Box>
        <SectionHeaderSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
      </Box>

      <Box>
        <SectionHeaderSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
      </Box>
    </ScrollView>
  );
};

export default TransactionListSkeleton;
