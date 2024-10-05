import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Hero = () => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center', 
      justifyContent: 'center',
      alignItems: 'center',
      p: 4, 
      backgroundColor: theme.palette.background.default,
    }}>
      <Typography variant="h3" fontWeight="bold" color={theme.palette.primary.main}>
        Find the Best Job that Fits Your Career
      </Typography>
      <Typography variant="h6" sx={{ color: theme.palette.primary.dark, mb:2, mt:2 }}>
          Connecting talents with opportunities for every skills level.
      </Typography>
        
      <Box
        variant="outlined"
        sx={{
          mb: 4,
          mt: 2,
          padding: 4,
          border: `1px solid rgba(0, 0, 0, 0.1)`, 
          backgroundColor: theme.palette.primary.main,
          borderRadius: 2,
          boxShadow: `0px 4px 20px rgba(0, 0, 0, 0.15)`,
          width: { xs: '90%', sm: '70%', md: '50%' },
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <Typography variant="body1" color={theme.palette.background.default}>
          We encourage you to explore the diverse range of jobs available and find the perfect fit for your professional journey.
          Whether you are seeking your first job or looking to advance your career, JobScan is here to assist you every step of the way.
          Don’t hesitate to dive in and apply for the positions that resonate with your goals!
        </Typography>
      </Box>
    
      {/* <TextField
        placeholder="Search Jobs..."
        variant="outlined"
        sx={{
          width: {
            xs: '100%',
            sm: '100%',
            md: '400px',
          },
          height: '40px',
          fontSize: '16px',
          p: 1,
        }}
      /> */}
    </Box>
  );
}

export default Hero;
