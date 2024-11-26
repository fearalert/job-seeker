import {
    Box,
    Typography,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    Link,
  } from '@mui/material';
  import { theme } from '../../../themes/theme';
  import { useEffect, useState } from 'react';
  import { validateLoginForm } from '../utils';
  import { LeftPanel, LoginContainer, LoginForm, RightPanel } from '../common/Common';
  import { ROLES } from '../../../constants';
  import { useNavigate } from 'react-router-dom';
  import { clearAllUserError, login } from '../../../store/slices/userSlice';
  import { useDispatch, useSelector } from 'react-redux';
  
  const JobSeekLogin = () => {
    const [form, setForm] = useState({
      email: '',
      password: '',
      role: ROLES.JOB_SEEKER,
      rememberMe: false,
      emailError: '',
      passwordError: '',
    });
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { loading, error, isAuthenticated } = useSelector((state) => state.user);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const { email, password } = form;
  
      setForm((prev) => ({ ...prev, emailError: '', passwordError: '' }));
  
      const errors = validateLoginForm({ email, password });
      if (Object.keys(errors).length > 0) {
        setForm((prev) => ({
          ...prev,
          ...errors,
        }));
        return;
      }
  
      dispatch(login({ email, password, role: form.role }));
    };
  
    useEffect(() => {
      if (isAuthenticated) {
        navigate('/dashboard');
      }
    }, [isAuthenticated, navigate]);
  
    useEffect(() => {
      return () => {
        dispatch(clearAllUserError());
      };
    }, [dispatch]);
  
    return (
      <LoginContainer>
        <LeftPanel>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h3" color="white" sx={{ mb: 1, fontWeight: 'bold' }}>
              Welcome JobSeeker
            </Typography>
            <Typography variant="subtitle1" color="white">
              Login to your account to find the best job for you.
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
  
              {error && (
               <Typography variant="caption" color="error">
               {error}
             </Typography>
              )}
  
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
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
  
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
  
  export default JobSeekLogin;