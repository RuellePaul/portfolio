import {createTheme} from '@mui/material/styles';
import {responsiveFontSizes} from '@mui/material';

let theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 400,
            md: 780,
            lg: 1200,
            xl: 1720
        }
    },
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    padding: '0 12px'
                }
            }
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'underline'
                    }
                }
            }
        }
    },
    palette: {
        mode: 'dark',
        divider: '#46505A'
    },
    typography: (palette) => ({
        fontFamily: 'Sora'
    })
});

theme = responsiveFontSizes(theme);

export default theme;
