import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  IconButton,
  Paper,
  Link
} from '@mui/material';
import { styled } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import { theme } from '../../themes/theme';

const LoginContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  padding: 0,
  margin: 0,
  backgroundColor: theme.palette.background.paper,
  maxWidth: '100%!important',
  height: '420px',
}));

const LeftPanel = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden'
}));

const RightPanel = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3)
}));

const LoginForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  width: '100%',
  maxWidth: 400,
  borderRadius: 16,
  boxShadow: 'none',
  height: '100%',
  overflowY: 'auto'
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.light}`,
  borderRadius: 8,
  padding: theme.spacing(0.5),
  margin: theme.spacing(0, 1)
}));

const LoginPage = () => {
  return (
    <LoginContainer>
      <LeftPanel>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h3" color="white" sx={{ mb: 1, fontWeight: 'bold' }}>
            Begin
          </Typography>
          <Typography variant="h3" color="white" sx={{ mb: 2, fontWeight: 'bold' }}>
            Journey here
          </Typography>
          <Typography variant="subtitle1" color="white">
            Create an account to Join Our Job Search Portal
          </Typography>
        </Box>
      </LeftPanel>
      
      <RightPanel>
        <LoginForm elevation={0}>
          <Typography variant="h5" align="center" sx={{ mb: 2, color: theme.palette.primary.main }}>
           Login
          </Typography>

          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="dense"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              size="small"
              sx={{ mb: 1 }}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              size="small" 
              sx={{ mb: 1 }}
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" size="small" />}
                label={<Typography variant="body2">Remember me</Typography>}
              />
              <Link href="#" variant="body2" color="primary">
                Reset Password!
              </Link>
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="small"
              sx={{ mb: 2 }}
            >
              Login
            </Button>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ flex: 1, borderBottom: 1, borderColor: 'grey.300' }} />
              <Typography variant="body2" sx={{ px: 2, color: 'text.secondary' }}>or</Typography>
              <Box sx={{ flex: 1, borderBottom: 1, borderColor: 'grey.300' }} />
            </Box>

            <Grid container justifyContent="center" spacing={1}>
              <Grid item>
                <SocialButton size="small">
                  <GoogleIcon fontSize="small" />
                </SocialButton>
              </Grid>
              <Grid item>
                <SocialButton size="small">
                  <FacebookIcon fontSize="small" />
                </SocialButton>
              </Grid>
              <Grid item>
                <SocialButton size="small">
                  <AppleIcon fontSize="small" />
                </SocialButton>
              </Grid>
            </Grid>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Dont Have an account?{' '}
                <Link href="#" color="primary" sx={{ textDecoration: 'none' }}>
                  Create Account
                </Link>
              </Typography>
            </Box>
          </Box>
        </LoginForm>
      </RightPanel>
    </LoginContainer>
  );
};

export default LoginPage;