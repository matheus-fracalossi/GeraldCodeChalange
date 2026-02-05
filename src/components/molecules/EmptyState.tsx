import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Text, Button, ButtonText } from '@/components/atoms';

interface EmptyStateProps {
  emoji?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonPress?: () => void;
  buttonAccessibilityLabel?: string;
  buttonAccessibilityHint?: string;
  titleKey?: string;
  descriptionKey?: string;
  buttonTextKey?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  emoji = '🔍',
  title,
  description,
  buttonText,
  onButtonPress,
  buttonAccessibilityLabel,
  buttonAccessibilityHint,
  titleKey,
  descriptionKey,
  buttonTextKey
}) => {
  const { t } = useTranslation();

  const displayTitle = titleKey ? t(titleKey as any) : title;
  const displayDescription = descriptionKey ? t(descriptionKey as any) : description;
  const displayButtonText = buttonTextKey ? t(buttonTextKey as any) : buttonText;

  return (
    <Box className="flex-1 px-6 py-12 items-center justify-center">
      <Box className="items-center max-w-sm gap-4">

        <Box className="w-24 h-24 bg-primary-100 rounded-full items-center justify-center">
          <Text size="4xl" className="text-center">
            {emoji}
          </Text>
        </Box>

        <Text 
          size="xl" 
          bold 
          className="text-typography-900 text-center"
          accessibilityRole="text"
        >
          {displayTitle}
        </Text>

        <Text 
          size="md" 
          className="text-typography-500 text-center leading-relaxed"
          accessibilityRole="text"
        >
          {displayDescription}
        </Text>

        {displayButtonText && onButtonPress && (
          <Button 
            action="primary" 
            size="md" 
            onPress={onButtonPress}
            className="mt-2"
            accessibilityLabel={buttonAccessibilityLabel}
            accessibilityHint={buttonAccessibilityHint}
          >
            <ButtonText>{displayButtonText}</ButtonText>
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default EmptyState;
