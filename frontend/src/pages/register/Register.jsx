import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState, useCallback } from 'react';
import { theme } from '../../themes/theme';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const RegisterContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  padding: 0,
  margin: 0,
  backgroundColor: theme.palette.background.paper,
  maxWidth: '100%!important',
  height: 'auto',
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
}));

const RightPanel = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
}));

const RegisterForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  width: '100%',
  maxWidth: 400,
  borderRadius: 16,
  boxShadow: 'none',
  height: '100%',
  overflowY: 'auto',
}));

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    emailError: '',
    passwordError: '',
    roleError: '',
  });

  const handleChange = useCallback((field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };


  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const { email, password, role } = form;
    setForm((prev) => ({ ...prev, emailError: '', passwordError: '', roleError: '' }));
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

    if (!role) {
      setForm((prev) => ({ ...prev, roleError: 'Please select a role' }));
      hasError = true;
    }

    if (hasError) return;

    console.log('Name:', form.name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Role:', role);

    setForm({ name: '', email: '', password: '', role: '', emailError: '', passwordError: '', roleError: '' });
  }, [form]);

  return (
    <RegisterContainer>
      <LeftPanel>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h3" color="white" sx={{ mb: 1, fontWeight: 'bold' }}>
            Welcome
          </Typography>
          <Typography variant="h3" color="white" sx={{ mb: 2, fontWeight: 'bold' }}>
            Join Us
          </Typography>
          <Typography variant="subtitle1" color="white">
            Create your account to access job opportunities
          </Typography>
        </Box>
      </LeftPanel>

      <RightPanel>
        <RegisterForm elevation={0}>
          <Typography variant="h5" align="center" sx={{ mb: 2, color: theme.palette.primary.main }}>
            Register
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="dense"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              size="small"
              value={form.name}
              onChange={handleChange('name')}
              sx={{ mb: 1 }}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              size="small"
              value={form.email}
              onChange={handleChange('email')}
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
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              size="small"
              value={form.password}
              onChange={handleChange('password')}
              error={!!form.passwordError}
              helperText={form.passwordError}
              sx={{ mb: 1 }}
              InputFilledProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

          <FormControl fullWidth margin="dense" error={!!form.roleError}>
            <InputLabel id="role-label" size="small">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              value={form.role}
              onChange={handleChange('role')}
              size="small"
              sx={{
                '& .MuiSelect-select': {
                  padding: '8.5px 14px',
                },
                '& .MuiInputBase-root': {
                  height: '56px',
                },
                mb: 1,
              }}
            >
              <MenuItem value=""><em>Select Role</em></MenuItem>
              <MenuItem value="Employer">Employer</MenuItem>
              <MenuItem value="Job Seeker">Job Seeker</MenuItem>
            </Select>
            {form.roleError && (
              <Typography variant="body2" color="error">
                {form.roleError}
              </Typography>
            )}
          </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="small"
              sx={{ mb: 2 }}
            >
              Register
            </Button>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link href="/login" color="primary" sx={{ textDecoration: 'none' }}>
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </RegisterForm>
      </RightPanel>
    </RegisterContainer>
  );
};

export default RegisterPage;
