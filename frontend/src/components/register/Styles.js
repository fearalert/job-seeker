import { styled } from '@mui/material/styles';
import { Paper, Box } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    padding: theme.spacing(2),
  }
}));

export const WelcomeSection = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(6),
  borderRadius: theme.shape.borderRadius,
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: 400,
  [theme.breakpoints.down('md')]: {
    minHeight: 200,
    padding: theme.spacing(3),
  }
}));

export const FormSection = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1),
  }
}));