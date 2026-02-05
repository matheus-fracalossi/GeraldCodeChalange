import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import './global.css';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Text } from '@/components/ui/text';

function App() {
  const colorScheme = useColorScheme() ?? 'dark';
  const isDarkMode = colorScheme === 'dark';


  return (
    <GluestackUIProvider mode={colorScheme}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
    </GluestackUIProvider>
  
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const {t} = useTranslation()

  // Sample data to demonstrate interpolation
  const sampleTransaction = {
    merchant: "Starbucks",
    amount: 4.50,
    date: "2024-01-15T10:30:00Z",
    count: 5,
    total: 25
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("transactions.title")}</Text>
      
      {/* Currency formatting */}
      <Text>{t("transactions.transactionAmount", { amount: sampleTransaction.amount })}</Text>
      
      {/* Date formatting */}
      <Text>{t("transactions.transactionDate", { date: sampleTransaction.date })}</Text>
      
      {/* DateTime formatting */}
      <Text>{t("transactions.transactionDateTime", { date: sampleTransaction.date })}</Text>
      
      {/* Total balance with currency */}
      <Text>{t("transactions.totalBalance", { balance: 1250.75 })}</Text>
      
      {/* Pluralization with count */}
      <Text>{t("transactions.transactionCount", { count: sampleTransaction.count })}</Text>
      
      {/* Complex interpolation with multiple values */}
      <Text>{t("transactions.merchantTransaction", { 
        merchant: sampleTransaction.merchant, 
        amount: sampleTransaction.amount 
      })}</Text>
      
      {/* Transaction summary */}
      <Text>{t("transactions.transactionSummary", {
        merchant: sampleTransaction.merchant,
        date: sampleTransaction.date,
        amount: sampleTransaction.amount
      })}</Text>
      
      {/* Filter results */}
      <Text>{t("transactions.filterResults", {
        count: sampleTransaction.count,
        total: sampleTransaction.total
      })}</Text>
      
      {/* Last updated */}
      <Text>{t("transactions.lastUpdated", { time: new Date().toISOString() })}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
