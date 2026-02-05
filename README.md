# Gerald Code Challenge - Personal Finance App

A React Native application for managing personal finances with transaction tracking, filtering, and search capabilities.

## 🎯 Challenge Overview

This app demonstrates a transaction management system with the following features:
- **Transaction List**: Display merchant, amount, date, and category
- **Filtering**: Filter by transaction type (All/Income/Expenses)
- **Search**: Real-time search by merchant name with debouncing
- **State Management**: Loading, error, and empty states with pull-to-refresh
- **Performance**: Optimized FlatList with proper key extraction
- **Accessibility**: Screen reader support and semantic elements

## 🏗️ Architecture Decisions

### **Component Structure (Atomic Design)**
```
src/components/
├── atoms/          # Basic UI elements (Button, Text, Input)
├── molecules/      # Composed components (TransactionItem, FilterBar)
└── organisms/      # Complex components (TransactionList, Header)
```

### **State Management**
- **Context API** with reducers for complex state management
- **Custom Hooks** for data fetching and business logic separation
- **Local State** for simple component-specific state

### **Data Layer**
- **Mock API** with simulated network delays for realistic UX
- **JSON Server** for development API simulation
- **TypeScript interfaces** for type safety and better DX

### **UI Framework**
- **Gluestack UI** for consistent design system
- **NativeWind** for utility-first styling
- **React Native CLI** (not Expo) as specified

### **Performance Optimizations**
- **FlatList** with `keyExtractor` and `getItemLayout`
- **React.memo** for expensive components
- **useMemo/useCallback** for computed values and callbacks
- **Debounced search** (300ms) to reduce API calls

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- React Native development environment setup
- iOS Simulator or Android Emulator
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/matheus-fracalossi/GeraldCodeChalange.git
cd GeraldCodeChalange
```

2. **Install dependencies**
```bash
npm install
```

3. **iOS Setup** (macOS only)
```bash
# Install CocoaPods dependencies
bundle install
bundle exec pod install
```

4. **Start the JSON Server** (Mock API)
```bash
# In a separate terminal
npm run start-server
```

5. **Start Metro Bundler**
```bash
# In another terminal
npm start
```

6. **Run the app**
```bash
# For iOS
npm run ios

# For Android
npm run android
```

### 🔧 Network Configuration (ngrok advice)

If you're experiencing issues with the client not communicating with the JSON server:

#### **Local Development**
The app is configured to use `http://localhost:3000` for the API. This works fine for iOS Simulator but may cause issues with Android Emulator.

#### **Android Emulator Issues**
Android Emulator maps `localhost` differently. Try these solutions:

1. **Use Android Emulator IP**
```bash
# Update src/api/httpClient.ts baseURL to:
const BASE_URL = 'http://10.0.2.2:3000';
```

2. **Reverse Proxy with ADB (Recommended for Android)**
```bash
# Set up reverse proxy using adb port forwarding
adb reverse tcp:3000 tcp:3000

# Keep the original localhost URL in httpClient.ts:
const BASE_URL = 'http://localhost:3000';

# Verify the reverse proxy is working
adb reverse --list
```

3. **Use ngrok for External Access**
```bash
# Install ngrok globally
npm install -g ngrok

# Expose your local JSON server (default port 3000)
ngrok http 3000

# Update src/api/httpClient.ts with ngrok URL:
const BASE_URL = 'https://your-ngrok-url.ngrok.io';
```

4. **Use Your Machine's IP**
```bash
# Find your local IP
ifconfig | grep "inet " | grep -v 127.0.0.1

# Update src/api/httpClient.ts with your IP:
const BASE_URL = 'http://YOUR_LOCAL_IP:3000';
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 📱 Features Implemented

### **Core Features**
- ✅ Transaction list with merchant, amount, date, category
- ✅ Filter by type (All/Income/Expenses)
- ✅ Search by merchant with 300ms debouncing
- ✅ Pull-to-refresh functionality
- ✅ Loading, error, and empty states
- ✅ Performance optimized FlatList

### **Technical Features**
- ✅ TypeScript with strict typing
- ✅ Functional programming patterns
- ✅ Custom hooks for business logic
- ✅ Context API for state management
- ✅ Accessibility support
- ✅ Unit tests with Jest
- ✅ Error boundaries
- ✅ Internationalization ready

## 🎨 Design Decisions

### **UI/UX Choices**
- **Clean, minimal design** focusing on readability
- **Color coding** for income (green) vs expenses (red)
- **Intuitive icons** for transaction types and categories
- **Smooth animations** for state transitions
- **Responsive layout** for different screen sizes

### **Data Presentation**
- **Currency formatting** with proper locale support
- **Relative dates** for better user experience
- **Category icons** for visual categorization
- **Amount highlighting** for quick scanning

## 🤖 AI Tools Used

### **Development Assistance**
- **Windsurf/Cascade AI**: Used for code generation, debugging, and architecture decisions with custom project rules set up locally
- **gluestackmcp**: Used for component generation and styling
- git mcp

### **How AI Helped**
- **Rapid prototyping** of components and hooks
- **TypeScript type definitions** generation
- **Test case generation** and edge case identification
- **Code review** and best practice suggestions
- **Documentation** writing and README creation
- **Architecture planning** and decision validation

### **Human Oversight**
- All AI-generated code was reviewed and tested
- Architecture decisions were validated against requirements
- Performance optimizations were measured and verified
- Accessibility features were manually tested

## 📊 Project Stats

- **Lines of Code**: ~2,000+ (excluding node_modules)
- **Components**: 15+ reusable components
- **Custom Hooks**: 3 specialized hooks
- **Test Coverage**: 80%+ for core business logic
- **TypeScript**: 100% typed codebase

## 🔗 Key Files

- `src/App.tsx` - Main application component
- `src/hooks/useTransactions.ts` - Transaction data management
- `src/components/organisms/TransactionList.tsx` - Main transaction display
- `src/api/httpClient.ts` - API client configuration
- `db.json` - Mock transaction data
- `src/types/` - TypeScript type definitions

---

**Built with ❤️ for Gerald Code Challenge**
