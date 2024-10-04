import { Typography, Button, Box, TextField } from '@mui/material';

function Hero() {
  return (
    <Box sx={{ textAlign: 'center', p: 4 }}>
      <Typography variant="h3" fontWeight="bold">
        Find the Best Job that Fits Your Life
      </Typography>
      <Typography variant="subtitle1" sx={{ my: 2 }}>
        JobScan presents a curated list of jobs with verified companies.
      </Typography>
      <Box sx={{ display: 'inline-flex', gap: 2, my: 3 }}>
        <TextField placeholder="Search Jobs..." variant="outlined" />
        <Button variant="contained" color="primary">Find Job</Button>
      </Box>
    </Box>
  );
}

export default Hero;
