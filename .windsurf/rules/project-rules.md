---
trigger: always_on
---

# Project Patterns

## Structure
**UI:**
- `components/ui` - Button, Text, Input (Gluestack)

**Folders:**
```
src/
├── components/{atoms,molecules,organisms}/
├── {screens,hooks,services,types,utils,context,data}/
```

## Types
```tsx
interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  category: string;
  type: "income" | "expense";
}

interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

type TransactionFilter = "all" | "income" | "expense";
```

## Patterns
**FUNCTIONAL PROGRAMMING MANDATORY:** Always use functional programming paradigms
**Components:** Arrow function components only - `const Component = () => {}`
**Hooks:** Arrow functions - `const useTransactions = () => {}`, `const useDebounce = () => {}`
**Functions:** Always use arrow functions - `const handlePress = () => {}`
**Methods:** Arrow functions for all methods and callbacks
**Naming:** PascalCase components, camelCase files/hooks, SCREAMING_SNAKE_CASE constants
**i18n:** Always use `useTranslation` hook for all text content - no hardcoded strings

## Functional Programming Rules
**MANDATORY - NO EXCEPTIONS:**
- Arrow functions for ALL functions: `const myFunction = () => {}`
- No `function` keyword allowed
- Immutable data patterns with spread operators
- Pure functions without side effects where possible
- Higher-order functions for data transformations
- Array methods: `map`, `filter`, `reduce`, `find` over loops
- Functional composition over imperative code

## UI Framework
**Gluestack:** Box (layout), Text (typography), Button (actions), Input (search), FlatList (lists)

## Accessibility
- `accessibilityLabel` on interactive elements
- `accessibilityRole` for semantic meaning
- Screen reader friendly formatting

## Performance
- `React.memo` for expensive components
- `useMemo`/`useCallback` for optimization
- FlatList `keyExtractor` and `getItemLayout`
- 300ms debounced search

## State
Context API with reducers:
```tsx
const TransactionContext = createContext();
const useTransactionContext = () => useContext(TransactionContext);
```

## Git Conventions
**ALWAYS USE GIT CONVENTIONS - MANDATORY**
**Commits:** `type(scope): short direct description` - feat, fix, docs, style, refactor, test, chore
- Keep commit messages short and direct
- Use imperative mood: "add feature" not "added feature"
- Max 50 characters for subject line
**Branches:** `feature/description`, `bugfix/description`, `hotfix/description`, `release/version`
**MCP:** Always use git MCP tools for operations