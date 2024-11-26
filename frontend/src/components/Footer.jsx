import { Box, Typography, useTheme } from '@mui/material';

function Footer() {
  const theme = useTheme();
  return (
    <Box width="100%" bottom={0} sx={{ py: 4, textAlign: 'center', backgroundColor: theme.palette.primary.dark, color: 'white' }}>
      <Typography variant="body1">© 2024 JobScan. All Rights Reserved.</Typography>
    </Box>
  );
}

export default Footer;
