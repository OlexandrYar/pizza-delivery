'use client'
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#d32f2f',
            light: '#ff6659',
            dark: '#9a0007',
        },
        secondary: {
            main: '#ff6f00',
            light: '#ffa000',
            dark: '#c43e00',
        },
        background: {
            default: '#1a1a1a',
            paper: '#2c2c2c',
        },
        text: {
            primary: '#f5f5f5',
            secondary: '#bdbdbd',
        },
    },
    typography: {
        fontFamily: '"Geist", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 700 },
        h3: { fontWeight: 600 },
        h5: { fontWeight: 500 },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 600,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    backgroundColor: '#2c2c2c',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#9a0007',
                },
            },
        },
    },
});

export default theme;
