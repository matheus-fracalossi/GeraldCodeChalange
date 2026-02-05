import React from 'react';
import { Box } from '@/components/ui/box';
import { Skeleton, SkeletonText } from '@/components/ui/skeleton';

const TransactionItemSkeleton: React.FC = () => {
  return (
    <Box className="flex-row py-4 px-1">
      {/* Icon skeleton */}
      <Skeleton variant="rounded" className="w-12 h-12 mr-3"  />

      {/* Content skeleton */}
      <Box className="flex-1 gap-1">
        <SkeletonText _lines={2} gap={1} className="h-3 w-2/6"  />
        <SkeletonText _lines={1} gap={1} className="h-3 w-1/6"  />
      </Box>

      <Box>
        <SkeletonText _lines={1} gap={1} className="h-3 w-10"  />
      </Box>
    </Box>
  );
};

export default TransactionItemSkeleton;
