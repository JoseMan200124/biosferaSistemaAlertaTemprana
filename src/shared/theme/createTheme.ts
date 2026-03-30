// Tema visual ajustado para alinearlo con la paleta aprobada del dashboard:
// azul institucional, turquesa y fondo claro.

import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#184A72' },
    secondary: { main: '#3FADBA' },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#184A72',
      secondary: '#35566E',
    },
  },
  typography: {
    fontFamily: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'].join(','),
    h5: {
      fontWeight: 800,
    },
    h6: {
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
});
