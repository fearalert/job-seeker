import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  // IconButton,
  Paper,
  Link,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { theme } from '../../themes/theme';
import { useState } from 'react';

const LoginContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  padding: 0,
  margin: 0,
  backgroundColor: theme.palette.background.paper,
  maxWidth: '100%!important',
  height: '420px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    height: 'auto',
  },
}));

const LeftPanel = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const RightPanel = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
}));

const LoginForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  width: '100%',
  maxWidth: 400,
  borderRadius: 16,
  boxShadow: 'none',
  height: '100%',
  overflowY: 'auto',
}));

// const SocialButton = styled(IconButton)(({ theme }) => ({
//   border: `1px solid ${theme.palette.primary.light}`,
//   borderRadius: 8,
//   padding: theme.spacing(0.5),
//   margin: theme.spacing(0, 1),
// }));

const LoginPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    rememberMe: false,
    emailError: '',
    passwordError: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;
    setForm((prev) => ({ ...prev, emailError: '', passwordError: '' }));
    let hasError = false;

    if (!email) {
      setForm((prev) => ({ ...prev, emailError: 'Email is required' }));
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setForm((prev) => ({ ...prev, emailError: 'Email is not valid' }));
      hasError = true;
    }

    if (!password) {
      setForm((prev) => ({ ...prev, passwordError: 'Password is required' }));
      hasError = true;
    } else if (password.length < 6) {
      setForm((prev) => ({ ...prev, passwordError: 'Password must be at least 6 characters' }));
      hasError = true;
    }

    if (hasError) return;

    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Remember Me:', form.rememberMe);

    setForm({ email: '', password: '', rememberMe: false, emailError: '', passwordError: '' });
  };

  return (
    <LoginContainer>
      <LeftPanel>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h3" color="white" sx={{ mb: 1, fontWeight: 'bold' }}>
            Welcome
          </Typography>
          <Typography variant="h3" color="white" sx={{ mb: 2, fontWeight: 'bold' }}>
            Back
          </Typography>
          <Typography variant="subtitle1" color="white">
           Login to your account to find the Job for you.
          </Typography>
        </Box>
      </LeftPanel>

      <RightPanel>
        <LoginForm elevation={0}>
          <Typography variant="h5" align="center" sx={{ mb: 2, color: theme.palette.primary.main }}>
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              error={!!form.emailError}
              helperText={form.emailError}
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
              value={form.password}
              onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              error={!!form.passwordError}
              helperText={form.passwordError}
              sx={{ mb: 1 }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.rememberMe}
                    color="primary"
                    size="small"
                    onChange={(e) => setForm((prev) => ({ ...prev, rememberMe: e.target.checked }))}
                  />
                }
                label={<Typography variant="body2">Remember me</Typography>}
              />
              <Link href="#" variant="body2" color="primary">
                Reset Password!
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="small"
              sx={{ mb: 2 }}
            >
              Login
            </Button>

            {/* <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ flex: 1, borderBottom: 1, borderColor: 'grey.300' }} />
              <Typography variant="body2" sx={{ px: 2, color: 'text.secondary' }}>or</Typography>
              <Box sx={{ flex: 1, borderBottom: 1, borderColor: 'grey.300' }} />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <SocialButton size="small">
                <GoogleIcon fontSize="small" />
              </SocialButton>
              <SocialButton size="small">
                <FacebookIcon fontSize="small" />
              </SocialButton>
              <SocialButton size="small">
                <AppleIcon fontSize="small" />
              </SocialButton>
            </Box> */}

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Dont Have an account?{' '}
                <Link href="/register" color="primary" sx={{ textDecoration: 'none' }}>
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
