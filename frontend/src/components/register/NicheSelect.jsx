import PropTypes from 'prop-types';
import { FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { memo } from 'react';
import { NICHE_OPTIONS } from '../../constants';

const NicheSelect = memo(({ 
  nicheNumber, 
  label, 
  value, 
  error, 
  onChange, 
  takenNiches 
}) => (
  <FormControl 
    fullWidth 
    size="small" 
    error={!!error}
    sx={{ mb: 1 }}
  >
    <InputLabel>{label}</InputLabel>
    <Select
      name={nicheNumber}
      value={value}
      onChange={onChange}
      label={label}
    >
      <MenuItem value="">Select {label}</MenuItem>
      {NICHE_OPTIONS.map((niche) => (
        <MenuItem 
          key={`${nicheNumber}-${niche}`} 
          value={niche}
          disabled={takenNiches.includes(niche) && value !== niche}
        >
          {niche}
        </MenuItem>
      ))}
    </Select>
    {error && (
      <Typography variant="caption" color="error">
        {error}
      </Typography>
    )}
  </FormControl>
));

NicheSelect.propTypes = {
  nicheNumber: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  takenNiches: PropTypes.arrayOf(PropTypes.string).isRequired
};

NicheSelect.displayName = 'NicheSelect';

export default NicheSelect;