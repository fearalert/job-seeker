import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Grid,
  Link,
  styled,
  IconButton,
  InputAdornment,
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { register } from '../../store/slices/userSlice';
import {NICHE_OPTIONS} from '../../constants';

const StyledPaper = styled(Paper)(({ theme }) => ({
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

const WelcomeSection = styled(Box)(({ theme }) => ({
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

const FormSection = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(4),
  margin: theme.spacing(2),
  overflowY: 'auto',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1),
  },
}))

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

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

  const validateForm = () => {
    const errors = {};

    if (!formData.role) errors.role = 'Role is required';
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.phone) errors.phone = 'Phone is required';
    if (!formData.address) errors.address = 'Address is required';
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (formData.role === 'Job Seeker') {
      if (!formData.firstNiche) errors.firstNiche = 'Primary niche is required';
      if (!formData.coverLetter) errors.coverLetter = 'Cover letter is required';
      if (!formData.resume) errors.resume = 'Resume is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

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
    if (validateForm()) {
      if (!loading) {
        const submitData = new FormData();
        Object.keys(formData).forEach((key) => {
          // Do not send confirmPassword to the backend
          if (key !== 'confirmPassword') {
            submitData.append(key, formData[key]);
          }
        });
        await dispatch(register(submitData));
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
        <WelcomeSection sx={{ backgroundColor: "primary.dark"}}>
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
                    <MenuItem value="Job Seeker">Job Seeker</MenuItem>
                    <MenuItem value="Employer">Employer</MenuItem>
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
                {renderTextField('password', 'Password', 'password',  false,
                  1,
                  showPassword,
                  setShowPassword)}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderTextField(
                  'confirmPassword',
                  'Confirm Password',
                  'password',
                  false,
                  1,
                  showConfirmPassword,
                  setShowConfirmPassword
                )}
              </Grid>

              {formData.role === 'Job Seeker' && (
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
                  <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      size="small"
                    >
                      Upload Resume
                      <input
                        type="file"
                        hidden
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                      />
                    </Button>
                    {formErrors.resume && (
                      <Typography variant="caption" color="error">
                        {formErrors.resume}
                      </Typography>
                    )}
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <Button 
                  variant="contained" 
                  type="submit" 
                  disabled={loading} 
                  fullWidth
                >
                  {loading ? 'Registering...' : 'Register'}
                </Button>
              </Grid>
            </Grid>
          </form>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Typography variant="body2" align="center" sx={{ mt: 2, mb: 2}}>
            Already have an account? 
            <br/>
            <Link href="/login/employer" variant="body2" color="primary.main" sx={{ ml: 0.5 }}>
              Sign In As Employeer
            </Link>
            <br />
            <Link href="/login/job-seeker" variant="body2" color="primary.main" sx={{ ml: 0.5 }}>
              Sign In As Job Seeker
            </Link>
          </Typography>
        </FormSection>
      </StyledPaper>
  );
};

export default Register;
