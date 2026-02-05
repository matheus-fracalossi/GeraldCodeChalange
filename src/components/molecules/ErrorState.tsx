import React from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from './EmptyState';

interface ErrorStateProps {
  onRetry?: () => void;
  customTitle?: string;
  customDescription?: string;
  customEmoji?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ 
  onRetry,
  customTitle,
  customDescription,
  customEmoji
}) => {
  const { t } = useTranslation();

  return (
    <EmptyState
      emoji={customEmoji || '⚠️'}
      titleKey={customTitle ? undefined : 'errors.somethingWentWrong'}
      title={customTitle}
      descriptionKey={customDescription ? undefined : 'errors.errorDescription'}
      description={customDescription}
      buttonTextKey={onRetry ? 'errors.tryAgain' : undefined}
      onButtonPress={onRetry}
      buttonAccessibilityLabel={t('errors.retryAccessibility' as any)}
      buttonAccessibilityHint={t('errors.retryHint' as any)}
    />
  );
};

export default ErrorState;
