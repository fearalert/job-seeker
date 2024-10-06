import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box,
  Container,
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

const StyledPaper = styled(Paper)(({ theme }) => ({
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

const WelcomeSection = styled(Box)(({ theme }) => ({
  background: '#3f51b5',
  color: 'white',
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

const FormSection = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1),
  }
}));

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
    firstNiche: '',
    secondNiche: '',
    thirdNiche: '',
    fourthNiche: '',
    coverLetter: '',
    resume: null
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const nichesArray = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
    "Business Analyst",
  ];
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
      if (formErrors.resume) {
        setFormErrors(prev => ({
          ...prev,
          resume: ''
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (!loading) {
        const submitData = new FormData();
        Object.keys(formData).forEach(key => {
          submitData.append(key, formData[key]);
        });
        await dispatch(register(submitData));
      }
    }
  };
  

  const renderTextField = (name, label, type = 'text', multiline = false, rows = 1) => (
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
      sx={{ mb: 1 }}
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
      } : undefined}
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
        {nichesArray.map((niche) => (
          <MenuItem 
            key={`${nicheNumber}-${niche}`} 
            value={niche}
            disabled={
              Object.entries(formData)
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
    <Container maxWidth="lg">
      <StyledPaper elevation={3}>
        <WelcomeSection sx={{ backgroundColor: "primary.main"}}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome
          </Typography>
          <Typography variant="h4" gutterBottom>
            Join Us
          </Typography>
          <Typography variant="subtitle1">
            Create your account to access job opportunities
          </Typography>
        </WelcomeSection>

        <FormSection>
          <Typography variant="h4" gutterBottom color="primary">
            Register
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl 
                  fullWidth 
                  size="small"
                  error={!!formErrors.role}
                  sx={{ mb: 1 }}
                >
                  <InputLabel>Register As</InputLabel>
                  <Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    label="Register As"
                  >
                    <MenuItem value="">Select Role</MenuItem>
                    <MenuItem value="Employer">Register as an Employer</MenuItem>
                    <MenuItem value="Job Seeker">Register as a Job Seeker</MenuItem>
                  </Select>
                  {formErrors.role && (
                    <Typography variant="caption" color="error">
                      {formErrors.role}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                {renderTextField('name', 'Full Name')}
              </Grid>

              <Grid item xs={12} md={6}>
                {renderTextField('email', 'Email', 'email')}
              </Grid>

              <Grid item xs={12} md={6}>
                {renderTextField('phone', 'Phone')}
              </Grid>

              <Grid item xs={12}>
                {renderTextField('address', 'Address')}
              </Grid>

              <Grid item xs={12}>
                {renderTextField('password', 'Password', 'password')}
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
                    {formData.resume && (
                      <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                        Selected file: {formData.resume.name}
                      </Typography>
                    )}
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
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{ mt: 2 }}
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Register'}
                </Button>
              </Grid>

              <Grid item xs={12} textAlign="center">
                <Typography variant="body2">
                  Already have an account?{' '}
                  <Link href="/login" underline="hover">
                    Login
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </FormSection>
      </StyledPaper>
    </Container>
  );
};

export default Register;