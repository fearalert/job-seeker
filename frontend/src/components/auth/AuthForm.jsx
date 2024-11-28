import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  Container,
  Alert,
  Autocomplete,
} from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { validateLoginForm, validateRegisterForm } from './utils.js';
import { ROLES, NICHE_OPTIONS } from '../../constants';
import { login, register } from '../../store/slices/userSlice';
import { theme } from '../../themes/theme';

const AuthForm = ({ mode = 'login', role }) => {
  const isLogin = mode === 'login';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, isAuthenticated } = useSelector((state) => state.user);

  const [form, setForm] = useState({
    email: '',
    password: '',
    rememberMe: false,
    name: '',
    confirmPassword: '',
    niche: [],
    coverLetter: '',
    resume: null,
    role: role,
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleNicheChange = (newValue) => {
    // Limit the selection to 4 niches
    if (newValue.length <= 4) {
      setForm((prev) => ({
        ...prev,
        niche: newValue,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, resume: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = isLogin
      ? validateLoginForm({ email: form.email, password: form.password })
      : validateRegisterForm(form);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const action = isLogin
      ? login({ email: form.email, password: form.password, role: form.role })
      : register(form);

    dispatch(action);

    if (isAuthenticated) {
      const from = location.state?.from || '/dashboard';
      navigate(from);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: '60vh', width: '100%', margin: 10, bgcolor: '#f5f5f5' }}>
      <Box sx={{ flex: 1, bgcolor: theme.palette.primary.main, color: 'white', padding: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Welcome Job Seeker</Typography>
        <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
          Find your dream job with JobScan.
          {/* { !isLogin && ' Create your profile to start applying to the best opportunities out there.'} */}
        </Typography>
      </Box>
      <Box sx={{ flex: 1, padding: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Container maxWidth="sm">

        <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 3 }}>
          {isLogin ? `Login as ${role}` : `Register as ${role}`}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Name Field (only for register form) */}
            {!isLogin && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                />
              </Grid>
            )}

            {/* Email Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
              />
            </Grid>

            {/* Password Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                error={!!formErrors.password}
                helperText={formErrors.password}
                InputProps={{
                  endAdornment: (
                    <Visibility
                      onClick={() => setShowPassword((prev) => !prev)}
                      style={{ cursor: 'pointer' }}
                    />
                  ),
                }}
              />
            </Grid>

            {/* Confirm Password Field */}
            {!isLogin && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  error={!!formErrors.confirmPassword}
                  helperText={formErrors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <Visibility
                        onClick={() => setShowPassword((prev) => !prev)}
                        style={{ cursor: 'pointer' }}
                      />
                    ),
                  }}
                />
              </Grid>
            )}

            {!isLogin && role === ROLES.JOB_SEEKER && (
            <>
                <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.primary.dark }}>
                    Select Your Niches
                </Typography>
                </Grid>
                <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="niche-select"
                  options={NICHE_OPTIONS}
                  value={form.niche || []} 
                  onChange={(event, newValue) => handleNicheChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Niches"
                      placeholder="Select up to 4 niches"
                      error={!!formErrors.niche}
                      helperText={formErrors.niche}
                    />
                  )}
                  disableCloseOnSelect
                  limitTags={4}
                  isOptionEqualToValue={(option, value) => option === value}
                  renderTags={(value, getTagProps) => {
                    return value.map((option, index) => (
                      <span
                        key={index}
                        style={{
                            backgroundColor: theme.palette.primary.light,
                            color: theme.palette.primary.main,
                            margin: '2px',
                            borderRadius: '16px',
                            padding: '2px 8px',
                            fontSize: '0.875rem',
                            display: 'inline-block',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                      >
                        {option}
                      </span>
                    ));
                  }}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Cover Letter"
                    name="coverLetter"
                    value={form.coverLetter}
                    onChange={handleChange}
                    error={!!formErrors.coverLetter}
                    helperText={formErrors.coverLetter}
                    multiline
                    rows={4}
                />
                </Grid>

                <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Upload Resume"
                    name="resume"
                    type="file"
                    onChange={handleFileChange}
                    error={!!formErrors.resume}
                    helperText={formErrors.resume}
                />
                </Grid>
            </>
            )}

            {isLogin && (
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.rememberMe}
                      name="rememberMe"
                      onChange={handleChange}
                    />
                  }
                  label="Remember Me"
                />
              </Grid>
            )}

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
                sx={{ py: 1.5 }}
              >
                {loading ? (isLogin ? 'Logging In...' : 'Registering...') : isLogin ? 'Login' : 'Register'}
              </Button>
            </Grid>

            {/* Error Message */}
            {error && (
              <Grid item xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
          </Grid>
          
            {/* Submit Button */}
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography variant="body2">
                    {isLogin
                        ? 'Don’t have an account?'
                        : 'Already have an account?'}{' '}
                    {ROLES.JOB_SEEKER ?
                        <Link to={isLogin ? '/register/job-seeker' : '/login/job-seeker'}>
                            {isLogin ? 'Register' : 'Login'}
                        </Link>
                        :
                        <Link to={isLogin ? '/register/employer' : '/login/employer'}>
                            {isLogin ? 'Register' : 'Login'}
                        </Link>
                    }
                    </Typography>
                </Box>
            </Grid>
        </form>
      </Container>
    </Box>
  </Box>
);
};

export default AuthForm;
