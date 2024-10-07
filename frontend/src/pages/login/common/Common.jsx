import { Box, Paper, styled } from "@mui/material";

export const LoginContainer = styled(Paper)(({ theme }) => ({
    display: 'flex',
    padding: 0,
    margin: 0,
    marginBottom: 4,
    backgroundColor: theme.palette.background.paper,
    maxWidth: '100%!important',
    height: '420px',
    boxShadow: theme.shadows[3],
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      height: 'auto',
    },
  }));
  
export const LeftPanel = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: 'white',
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(3),
    }
  }));
  
export const RightPanel = styled(Box)(({ theme }) => ({
    flex: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3),
  }));
  
export const LoginForm = styled(Paper)(({ theme }) => ({
    flex: 1,
    padding: theme.spacing(4),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1),
    }
  }));