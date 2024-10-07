import { useState, useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash-es';
import { 
  Container,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Link,
  Alert,
  Box
} from '@mui/material';
import { register } from '../../store/slices/userSlice';
import { INITIAL_REGISTER_FORM_STATE, ROLES } from '../../constants';
import { validateForm } from './utils';
import { FormSection, StyledPaper, WelcomeSection } from '../../components/register/Styles';
import FormField from '../../components/register/FormField';
import NicheSelect from '../../components/register/NicheSelect';


const Register = () => {
  const dispatch = useDispatch();
  const dispatchRef = useRef(dispatch);
  const { loading, error } = useSelector((state) => state.user);
  
  const [formData, setFormData] = useState(INITIAL_REGISTER_FORM_STATE);
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);


  const debouncedValidation = useRef(
    debounce((newFormData) => {
      const errors = validateForm(newFormData);
      setFormErrors(errors);
    }, 300)
  ).current;
  

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newFormData = { ...prev, [name]: value };
      debouncedValidation(newFormData);
      return newFormData;
    });
  }, [debouncedValidation]);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }));
      setFormErrors(prev => ({ ...prev, resume: '' }));
    }
  }, []);

  const debouncedSubmit = useRef(
    debounce(async (submitData) => {
      await dispatchRef.current(register(submitData));
    }, 1000, { leading: true, trailing: false })
  ).current;


  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const errors = validateForm(formData);
      
      if (Object.keys(errors).length === 0 && !loading) {
        const submitData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (value) submitData.append(key, value);
        });
        debouncedSubmit(submitData);
        setIsSubmitted(true);
      } else {
        setFormErrors(errors);
      }
    },
    [formData, loading, debouncedSubmit]
  );
  
  const takenNiches = useMemo(() => {
    return Object.entries(formData)
      .filter(([key, value]) => key.includes('Niche') && value)
      // eslint-disable-next-line no-unused-vars
      .map(([_key, value]) => value);
  }, [formData]);

  const togglePassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return (
    <Container maxWidth="lg">
      <StyledPaper elevation={3}>
        <WelcomeSection>
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
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl 
                  fullWidth 
                  size="small"
                  error={!!formErrors.role}
                >
                  <InputLabel>Register As</InputLabel>
                  <Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    label="Register As"
                  >
                    <MenuItem value="" disabled={true}>Select Role</MenuItem>
                    <MenuItem value={ROLES.EMPLOYER}>Register as an Employer</MenuItem>
                    <MenuItem value={ROLES.JOB_SEEKER}>Register as a Job Seeker</MenuItem>
                  </Select>
                  {formErrors.role && (
                    <Typography variant="caption" color="error">
                      {formErrors.role}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormField
                  name="name"
                  label="Full Name"
                  value={formData.name}
                  error={formErrors.name}
                  onChange={handleChange}
                  showErrors={isSubmitted} 
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormField
                  name="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  error={formErrors.email}
                  onChange={handleChange}
                  showErrors={isSubmitted} 
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormField
                  name="phone"
                  label="Phone"
                  type="tel"
                  value={formData.phone}
                  error={formErrors.phone}
                  onChange={handleChange}
                  showErrors={isSubmitted} 
                />
              </Grid>

              <Grid item xs={12}>
                <FormField
                  name="password"
                  label="Password"
                  type="password"
                  value={formData.password}
                  error={formErrors.password}
                  onChange={handleChange}
                  showPassword={showPassword}
                  togglePassword={togglePassword}
                  showErrors={isSubmitted} 
                />
              </Grid>

              {formData.role === ROLES.JOB_SEEKER && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom color="primary.main">
                      Professional Details
                    </Typography>
                  </Grid>

                    <Grid item xs={12} md={6}>
                      <NicheSelect
                        nicheNumber="firstNiche"
                        label="Primary Niche"
                        value={formData.firstNiche}
                        error={formErrors.firstNiche}
                        onChange={handleChange}
                        takenNiches={takenNiches}
                        showErrors={isSubmitted}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <NicheSelect
                        nicheNumber="secondNiche"
                        label="Secondary Niche"
                        value={formData.secondNiche}
                        error={formErrors.secondNiche}
                        onChange={handleChange}
                        takenNiches={takenNiches}
                        showErrors={isSubmitted}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <NicheSelect
                        nicheNumber="thirdNiche"
                        label="Third Niche"
                        value={formData.thirdNiche}
                        error={formErrors.thirdNiche}
                        onChange={handleChange}
                        takenNiches={takenNiches}
                        showErrors={isSubmitted}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <NicheSelect
                        nicheNumber="fourthNiche"
                        label="Fourth Niche"
                        value={formData.fourthNiche}
                        error={formErrors.fourthNiche}
                        onChange={handleChange}
                        takenNiches={takenNiches}
                        showErrors={isSubmitted}
                      />
                    </Grid>

                  <Grid item xs={12}>
                    <FormField
                      name="coverLetter"
                      label="Cover Letter"
                      multiline
                      rows={4}
                      value={formData.coverLetter}
                      error={formErrors.coverLetter}
                      onChange={handleChange}
                      showErrors={isSubmitted} 
                    />
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

              <Box sx={{ mt: 2, textAlign: 'center', flex: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Already Have an account?{' '}
                  <Link href="/login" color="primary" sx={{ textDecoration: 'none' }}>
                    Login
                  </Link>
                </Typography>
              </Box>
            </Grid>
          </form>
        </FormSection>
      </StyledPaper>
    </Container>
  );
};

export default Register;