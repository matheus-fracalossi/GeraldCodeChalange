import React from 'react';
import { Box } from './box';
import { SkeletonText } from './skeleton';

interface SectionHeaderSkeletonProps {
  isYearHeader?: boolean;
}

const SectionHeaderSkeleton: React.FC<SectionHeaderSkeletonProps> = ({ 
  isYearHeader = false 
}) => {
  return (
    <Box className="py-2">
      {isYearHeader ? (
        <SkeletonText _lines={1} className="h-6 w-16"  />
      ) : (
        <SkeletonText _lines={1} className="h-4 w-24"  />
      )}
    </Box>
  );
};

export default SectionHeaderSkeleton;
