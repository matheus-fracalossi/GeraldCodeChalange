import React from 'react';
import { Box, Text, Button, ButtonText } from '../ui';

interface EmptyStateProps {
  onClearFilters?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onClearFilters }) => {
  return (
    <Box className="flex-1 px-6 py-12 items-center justify-center">
      <Box className="items-center max-w-sm gap-4">

        <Box className="w-24 h-24 bg-primary-100 rounded-full items-center justify-center">
          <Text size="4xl" className="text-center">
            🔍
          </Text>
        </Box>

        <Text 
          size="xl" 
          bold 
          className="text-typography-900 text-center"
          accessibilityRole="text"
        >
          No transactions found
        </Text>

        <Text 
          size="md" 
          className="text-typography-500 text-center leading-relaxed"
          accessibilityRole="text"
        >
          Try adjusting your filters or search term to find what you're looking for.
        </Text>

        {onClearFilters && (
          <Button 
            action="primary" 
            size="md" 
            onPress={onClearFilters}
            className="mt-2"
            accessibilityLabel="Clear all filters to show all transactions"
            accessibilityHint="Removes all active filters and search terms"
          >
            <ButtonText>Clear Filters</ButtonText>
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default EmptyState;
