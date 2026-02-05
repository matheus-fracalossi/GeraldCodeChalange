import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import './global.css';
import { StatusBar, StyleSheet, useColorScheme, View, FlatList, ActivityIndicator } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Text } from '@/components/ui/text';
import { useTransactions } from './src/hooks/useTransactions';
import { Transaction } from './src/types/transaction';

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
  const { t } = useTranslation();
  const { transactions, loading, error } = useTransactions();

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionHeader}>
        <Text style={styles.merchant}>{item.merchant}</Text>
        <Text style={[styles.amount, item.type === 'income' ? styles.income : styles.expense]}>
         {t('transactions.transactionAmount', { amount: item.amount })}
        </Text>
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.date}>{t('transactions.transactionDate', { date: item.date })}</Text>
      </View>
    </View>
  );

  if (loading && transactions.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>{t("common.loading")}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      <Text style={styles.title}>{t("transactions.title")}</Text>
      
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        refreshing={loading && transactions.length === 0}
        ListFooterComponent={() => 
          loading && transactions.length > 0 ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator size="small" />
            </View>
          ) : null
        }
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  transactionItem: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    marginVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  merchant: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    flex: 1,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  income: {
    color: '#28a745',
  },
  expense: {
    color: '#dc3545',
  },
  transactionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontSize: 14,
    color: '#6c757d',
    textTransform: 'capitalize',
  },
  date: {
    fontSize: 14,
    color: '#6c757d',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6c757d',
  },
  errorText: {
    fontSize: 16,
    color: '#dc3545',
    textAlign: 'center',
  },
  footerLoader: {
    padding: 20,
    alignItems: 'center',
  },
});

export default App;
