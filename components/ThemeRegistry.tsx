'use client';

import { ThemeProvider, CssBaseline } from "@mui/material";
import { useState, useMemo, createContext, useContext } from "react";
import createAppTheme from "../theme/theme";
import { PaletteMode } from "@mui/material";

// Create a context for theme mode that can be used throughout the app
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light' as PaletteMode,
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  // Use state to track the current theme mode
  const [mode, setMode] = useState<PaletteMode>('dark');
  
  // Theme toggle function
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode],
  );

  // Create the theme based on the current mode
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
