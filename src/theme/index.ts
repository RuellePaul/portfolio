import {createTheme} from '@mui/material/styles';
import {responsiveFontSizes} from '@mui/material';

let theme = createTheme({
    components: {},
    palette: {
        mode: 'dark'
    },
    typography: (palette) => ({
        fontFamily: 'Sora'
    })
});

theme = responsiveFontSizes(theme);

export default theme;
