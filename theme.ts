import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#9c27b0" },
    background: { default: "#ffffff", paper: "#f5f5f5" },
    gradient: "linear-gradient(135deg, #ffffff 0%, #e3f0ff 50%, #e1d8fc 100%)"
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#ce93d8" },
    background: { default: "#181a20", paper: "#23263a" },
    gradient: "linear-gradient(135deg, #181a20 0%, #23263a 60%, #2d1b3c 100%)"
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export { lightTheme, darkTheme };

// --- TypeScript module augmentation for custom palette.gradient ---
import { PaletteOptions, Palette } from '@mui/material/styles';
declare module '@mui/material/styles' {
  interface Palette {
    gradient: string;
  }
  interface PaletteOptions {
    gradient?: string;
  }
}
