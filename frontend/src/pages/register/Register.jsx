import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  // Link,
  IconButton,
  InputAdornment,
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { register } from '../../store/slices/userSlice';
import { NICHE_OPTIONS, ROLES } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { validateRegisterForm } from './utils';
import { FormSection, StyledPaper, WelcomeSection } from './Sytles';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    firstNiche: '',
    secondNiche: '',
    thirdNiche: '',
    fourthNiche: '',
    coverLetter: '',
    resume: null,
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { loading, error, isAuthenticated } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        resume: file,
      }));
      if (formErrors.resume) {
        setFormErrors((prev) => ({
          ...prev,
          resume: '',
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateRegisterForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      if (!loading) {
        const submitData = validateRegisterForm(formData);
        await dispatch(register(submitData));

        if (isAuthenticated) {
          navigate('/dashboard');
        }
      }
    }
  };

  const renderTextField = (name, label, type = 'text', multiline = false, rows = 1, showPassword = false, setShowPassword = () => {}) => (
    <TextField
      margin="dense"
      required
      fullWidth
      id={name}
      label={label}
      name={name}
      type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
      autoComplete={name}
      size="small"
      value={formData[name]}
      onChange={handleChange}
      error={!!formErrors[name]}
      helperText={formErrors[name]}
      multiline={multiline}
      rows={rows}
      sx={{ mb: 0 }}
      InputProps={type === 'password' ? {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      } : {}}
    />
  );

  const renderNicheSelect = (nicheNumber, label) => (
    <FormControl 
      fullWidth 
      size="small" 
      error={!!formErrors[nicheNumber]}
      sx={{ mb: 1 }}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        name={nicheNumber}
        value={formData[nicheNumber]}
        onChange={handleChange}
        label={label}
      >
        <MenuItem value="">Select {label}</MenuItem>
        {NICHE_OPTIONS.map((niche) => (
          <MenuItem 
            key={`${nicheNumber}-${niche}`} 
            value={niche}
            disabled={Object.entries(formData)
              .filter(([key, value]) => key.includes('Niche') && value === niche)
              .length > 0 && formData[nicheNumber] !== niche
            }
          >
            {niche}
          </MenuItem>
        ))}
      </Select>
      {formErrors[nicheNumber] && (
        <Typography variant="caption" color="error">
          {formErrors[nicheNumber]}
        </Typography>
      )}
    </FormControl>
  );

  return (
    <StyledPaper elevation={3}>
      <WelcomeSection sx={{ backgroundColor: "primary.dark" }}>
        <Typography variant="h4" color="white" sx={{ mb: 1, fontWeight: 'bold' }}>
          Welcome to Job Scan
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Register as a Job Seeker or Employer
        </Typography>
      </WelcomeSection>
      <FormSection>
        <Typography variant="h5" align="center" sx={{ mb: 2, color: "primary.main", fontWeight: "bold" }}>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth size="small" required>
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  label="Role"
                >
                  <MenuItem value="" disabled>Select Role</MenuItem>
                  <MenuItem value={ROLES.JOB_SEEKER}>Job Seeker</MenuItem>
                  <MenuItem value={ROLES.EMPLOYER}>Employer</MenuItem>
                </Select>
                {formErrors.role && (
                  <Typography variant="caption" color="error">
                    {formErrors.role}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderTextField('name', 'Full Name')}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderTextField('email', 'Email')}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderTextField('phone', 'Phone Number')}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderTextField('address', 'Address')}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderTextField('password', 'Password', 'password', false, 1, showPassword, setShowPassword)}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderTextField('confirmPassword', 'Confirm Password', 'password', false, 1, showConfirmPassword, setShowConfirmPassword)}
            </Grid>

            {formData.role === ROLES.JOB_SEEKER && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom color="primary.main" sx={{ mt: 2 }}>
                    Professional Details
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  {renderNicheSelect('firstNiche', 'Primary Niche')}
                </Grid>
                <Grid item xs={12} md={6}>
                  {renderNicheSelect('secondNiche', 'Secondary Niche')}
                </Grid>
                <Grid item xs={12} md={6}>
                  {renderNicheSelect('thirdNiche', 'Third Niche')}
                </Grid>
                <Grid item xs={12} md={6}>
                  {renderNicheSelect('fourthNiche', 'Fourth Niche')}
                </Grid>

                <Grid item xs={12}>
                  {renderTextField('coverLetter', 'Cover Letter', 'text', true, 4)}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    margin="dense"
                    fullWidth
                    id="resume"
                    label="Resume (PDF/Word)"
                    name="resume"
                    type="file"
                    onChange={handleFileChange}
                    error={!!formErrors.resume}
                    helperText={formErrors.resume}
                  />
                </Grid>
              </>
            )}
          </Grid>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            disabled={loading} 
            sx={{ mt: 2, width: '100%' }}
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
        {/* <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link href="/login" variant="body2" sx={{ textDecoration: 'none', color: 'primary.main' }}>
            Sign In
          </Link>
        </Typography> */}
      </FormSection>
    </StyledPaper>
  );
};

export default Register;