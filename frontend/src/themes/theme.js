import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#3D3B8E',
      light: '#A9A9DB',
      dark: '#252456',
      contrastText: '#fff',
    },
    secondary: {
      main: '#6883BA',
      contrastText: '#fff',
    },
    background: {
      default: '#F9F9F9',
      paper: '#F4F4F4',
      contrastText: '#0C0C1D',
    },
    tertiary: {
      main: '#B0E298',
      contrastText: '#0C0C1D',
      dark: '#61BF36',
      light: '#B5E4A0',
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            backgroundColor: '#3D3B8E',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#716FC3',
            },
          },
        },
        {
            props: { variant: 'outlined' },
            style: {
              borderColor: '#716FC3',
              color: '#716FC3',
              '&:hover': {
                backgroundColor: '#716FC3',
                borderColor: '#716FC3',
                color: '#fff',
              },
            },
          },
      ],
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '& fieldset': {
              borderColor: '#3D3B8E',
            },
            '&:hover fieldset': {
              borderColor: '#716FC3',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3D3B8E',
            },
          },
        },
      },
    },
    MuiBox: {
      variants: [
        {
          props: { variant: 'default' },
          style: {
            backgroundColor: '#F9F9F9',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
          },
        },
        {
            props: { variant: 'secondary' },
            style: {
              backgroundColor: '#F4F4F4',
              borderRadius: '12px',
              border: '1px solid #E0E0E0',
              width: 'auto',
              padding: '2px',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
            },
          },
      ],
    },
    MuiContainer: {
      variants: [
        {
            props: { variant: 'overall' },
            style: {
              backgroundColor: '#F9F9F9',
              flex: '1 0 auto',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              overflow:'auto',
            },
          },
        {
          props: { variant: 'main' },
          style: {
            backgroundColor: '#F9F9F9',
            flex: '1 0 auto',
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          },
        },
        {
          props: { variant: 'secondary' },
          style: {
            backgroundColor: '#fff',
            padding: '16px',
            border: '1px solid #E0E0E0',
            borderRadius: '8px',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          },
        },
      ],
    },
    MuiTypography: {
        styleOverrides: {
          h6: {
            fontWeight: 'bold',
            color: '#fff',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: '#F4F4F4',
            color: '#3D3B8E',
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            '&.active': {
              backgroundColor: '#716FC3',
              color: '#fff',
            },
          },
        },
      },
  },
});
