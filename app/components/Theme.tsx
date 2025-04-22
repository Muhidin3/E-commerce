'use client';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextProps {
  mode: ThemeMode;
  toggleColorMode: () => void;
}

const ThemeModeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (!context) throw new Error('useThemeMode must be used within ThemeRegistry');
  return context;
};

const ThemeRegistry = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>('dark');

  // Optional: persist mode with localStorage
  useEffect(() => {
    const stored = localStorage.getItem('mui-theme') as ThemeMode;
    if (stored) setMode(stored);
  }, []);

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const next = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('mui-theme', next);
      return next;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#1976d2' : '#90caf9',
          },
          background: {
            default: mode === 'light' ? '#f5f5f5' : '#090a0b',
            paper: mode === 'light' ? '#ffffff' : '#090a0b',
          },
          text:{
            primary: mode === 'light' ? '#000000' : '#BFCFE7',
            secondary: mode === 'light' ? '#000000' : '#78818f',
          }
        },
        typography: {
          fontFamily: 'Inter, Roboto, Arial, sans-serif',
          
        },
        breakpoints:{
          values:{
            xs:0,
            sm:500,
            md:800,
            lg:1000,
            xl:1500
          }
        }
      }),
    [mode]
  );

  return (
    <ThemeModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeRegistry;
