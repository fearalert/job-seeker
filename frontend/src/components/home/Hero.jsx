import { Typography, Box, Paper } from '@mui/material';
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
      p: theme.spacing(4), 
      backgroundColor: theme.palette.background.default,
      mt: theme.spacing(8),
      maxWidth: '100%',
      overflowX: 'hidden',
    }}>
      <Typography variant="h3" fontWeight="bold" color={theme.palette.primary.main}>
        Find the Best Job that Fits Your Career
      </Typography>
      <Typography variant="h6" sx={{ color: theme.palette.primary.dark, mb:2, mt:2 }}>
          Connecting talents with opportunities for every skills level.
      </Typography>
        
      <Paper
          variant="outlined"
          sx={{
            mb: 4,
            mt: 2,
            padding: 4,
            border: `1px solid rgba(0, 0, 0, 0.1)`,
            backgroundColor: theme.palette.primary.main,
            borderRadius: 2,
            boxShadow: `0px 4px 20px rgba(0, 0, 0, 0.15)`,
            margin: '0 auto',
            display: 'flex', 
            justifyContent: 'center',
            '&:hover': {
               backgroundColor: theme.palette.tertiary.dark,
               color: theme.palette.background.default,
             },
          }}
        >
          <Typography variant="body1" color={theme.palette.background.default}>
            We encourage you to explore the diverse range of jobs available and find the perfect fit for your professional journey.
            Whether you are seeking your first job or looking to advance your career, JobScan is here to assist you every step of the way.
            Don’t hesitate to dive in and apply for the positions that resonate with your goals!
          </Typography>
        </Paper>
    </Box>
  );
}

export default Hero;
