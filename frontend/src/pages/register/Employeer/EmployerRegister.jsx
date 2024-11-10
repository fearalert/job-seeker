import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Typography,
  TextField,
  Button,
  Grid,
  // Link,
  IconButton,
  InputAdornment,
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ROLES } from '../../../constants';
import { Link, useNavigate } from 'react-router-dom';
import { createFormData, validateForm } from '../utils';
import { FormSection, StyledPaper } from '../Styles';
import { register } from '../../../store/slices/userSlice';

const EmployeerRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: ROLES.EMPLOYER,
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
      role : ROLES.EMPLOYER,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        role : ROLES.EMPLOYER,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      if (!loading) {
        const submitData = createFormData(formData);
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


  return (
    <StyledPaper elevation={3}>
      <FormSection>
        <Typography variant="h5" align="center" sx={{ mb: 2, color: "primary.main", fontWeight: "bold" }}>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
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
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link href="/login/employer" variant="body2" sx={{ textDecoration: 'none', color: 'primary.main' }}>
            Sign In
          </Link>
        </Typography>
      </FormSection>
    </StyledPaper>
  );
};

export default EmployeerRegister;