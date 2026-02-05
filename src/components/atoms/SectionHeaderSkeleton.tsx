import React from 'react';
import { Box } from '@/components/ui/box';
import { SkeletonText } from '@/components/ui/skeleton';

interface SectionHeaderSkeletonProps {
  isYearHeader?: boolean;
}

const SectionHeaderSkeleton: React.FC<SectionHeaderSkeletonProps> = ({ 
  isYearHeader = false 
}) => {
  return (
    <Box className="py-2 bg-white">
      {isYearHeader ? (
        // Year header skeleton (larger)
        <SkeletonText _lines={1} className="h-6 w-16"  />
      ) : (
        // Date header skeleton (smaller)
        <SkeletonText _lines={1} className="h-4 w-24"  />
      )}
    </Box>
  );
};

export default SectionHeaderSkeleton;
