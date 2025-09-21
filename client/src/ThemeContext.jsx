import { createContext } from 'react';

// Create ThemeContext with a default value
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});