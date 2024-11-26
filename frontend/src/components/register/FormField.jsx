import PropTypes from 'prop-types';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { memo } from 'react';

const FormField = memo(({ 
  name, 
  label, 
  type = 'text', 
  multiline = false, 
  rows = 1,
  showPassword,
  togglePassword,
  value,
  error,
  onChange,
  showErrors
}) => (
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
    value={value}
    onChange={onChange}
    error={showErrors && !!error}
    helperText={showErrors && error}
    multiline={multiline}
    rows={rows}
    sx={{ mb: 1 }}
    InputProps={type === 'password' ? {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            onClick={togglePassword}
            edge="end"
            type="button"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      )
    } : undefined}
  />
));

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'password', 'tel']),
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  showPassword: PropTypes.bool,
  togglePassword: PropTypes.func,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  showErrors: PropTypes.bool
};

FormField.displayName = 'FormField';

export default FormField;
