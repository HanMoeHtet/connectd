import { purple } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';

export const lightTheme = createTheme({
  palette: {
    type: 'light',
  },
});

export const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: purple[500],
    },
  },
  overrides: {
    MuiOutlinedInput: {
      input: {
        '&:-webkit-autofill': {
          '-webkit-box-shadow': '0 0 0 100px #424242 inset',
        },
      },
    },
  },
});
