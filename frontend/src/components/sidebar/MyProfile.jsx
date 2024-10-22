import { useSelector } from 'react-redux';
import { TextField, Box, Typography, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ROLES } from "../../constants.js";

const MyProfile = () => {
  const { user } = useSelector((state) => state.user);
  const theme = useTheme();

  return (
    <Container variant="main">
      <Box variant="default">
        <Typography variant="h6" style={{ color: theme.palette.primary.main }}>
          My Profile
        </Typography>
        
        <Box variant="secondary">
          <TextField
            label="Full Name"
            type="text"
            value={user?.name || ''}
            disabled
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email Address"
            type="email"
            value={user?.email || ''}
            disabled
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            type="number"
            value={user?.phone || ''}
            disabled
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            type="text"
            value={user?.address || ''}
            disabled
            fullWidth
            margin="normal"
          />
          <TextField
            label="Role"
            type="text"
            value={user?.role || ''}
            disabled
            fullWidth
            margin="normal"
          />
          <TextField
            label="Joined On"
            type="text"
            value={user?.createdAt || ''}
            disabled
            fullWidth
            margin="normal"
          />
          {user?.role === ROLES.JOB_SEEKER && (
            <Box variant="secondary" style={{ marginTop: '5px' }}>
              <Typography variant="h6" color="primary.dark">My Preferred Job Niches</Typography>
              <TextField
                label="First Niche"
                type="text"
                value={user?.niches?.firstNiche || ''}
                disabled
                fullWidth
                margin="normal"
              />
              <TextField
                label="Second Niche"
                type="text"
                value={user?.niches?.secondNiche || ''}
                disabled
                fullWidth
                margin="normal"
              />
              <TextField
                label="Third Niche"
                type="text"
                value={user?.niches?.thirdNiche || ''}
                disabled
                fullWidth
                margin="normal"
              />
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default MyProfile;
