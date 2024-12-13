import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
