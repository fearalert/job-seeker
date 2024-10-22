import { Box, Paper, styled } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
    display: 'flex',
    padding: 0,
    margin: 0,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  }));
  
export const WelcomeSection = styled(Box)(({ theme }) => ({
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
    },
  }));
  
export const FormSection = styled(Box)(({ theme }) => ({
    flex: 1,
    padding: theme.spacing(4),
    margin: theme.spacing(2),
    overflowY: 'auto',
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1),
    },
  }));