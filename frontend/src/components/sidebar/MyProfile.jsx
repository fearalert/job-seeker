import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
  Avatar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { ROLES } from "../../constants.js";
import { format } from "date-fns";
import { useState } from "react";

const MyProfile = () => {
  const { user } = useSelector((state) => state.user);
  const theme = useTheme();
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Box display="flex" flexDirection="column" alignItems="center" mb={4} >
        <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 80, height: 80, mb: 2 }}>
          <PersonIcon fontSize="large" />
        </Avatar>
        <Typography variant="h4" fontWeight="bold" color="primary">
          My Profile
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="space-around"
        mb={4}
        p={2}
        borderRadius={2}
        bgcolor={theme.palette.grey[100]}
        boxShadow={1}
        sx={{ borderRadius: 2, flex: 1,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease-in-out',}}
      >
        <Box textAlign="center">
          <Typography variant="h6" color="black">Total Jobs Applied</Typography>
          <Typography variant="h2" color="primary.main">
            {user?.totalAppliedJobs || 0}
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box textAlign="center">
          <Typography variant="h6" color="black">Total Jobs Posted</Typography>
          <Typography variant="h2" color="primary.main">
            {user?.totalPostedJobs || 0}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Card elevation={3} sx={{ borderRadius: 2, flex: 1,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease-in-out',}}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary.main">
                Personal Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List disablePadding>
                <ListItem>
                  <PersonIcon color="action" sx={{ mr: 2 }} />
                  <ListItemText primary="Full Name" secondary={user?.name || "N/A"} />
                </ListItem>
                <ListItem>
                  <EmailIcon color="action" sx={{ mr: 2 }} />
                  <ListItemText primary="Email Address" secondary={user?.email || "N/A"} />
                </ListItem>
                <ListItem>
                  <PhoneIcon color="action" sx={{ mr: 2 }} />
                  <ListItemText primary="Phone Number" secondary={user?.phone || "N/A"} />
                </ListItem>
                <ListItem>
                  <LocationOnIcon color="action" sx={{ mr: 2 }} />
                  <ListItemText primary="Address" secondary={user?.address || "N/A"} />
                </ListItem>
                <ListItem>
                  <WorkIcon color="action" sx={{ mr: 2 }} />
                  <ListItemText primary="Role" secondary={user?.role || "N/A"} />
                </ListItem>
                <ListItem>
                  <DateRangeIcon color="action" sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Joined On"
                    secondary={user?.createdAt ? format(new Date(user.createdAt), "MMMM dd, yyyy") : "N/A"}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Card elevation={3} sx={{ borderRadius: 2, flex: 1,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease-in-out',}}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary.main">
                Job Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
              >
                <Tab label="Overview" />
                <Tab label={user?.role === ROLES.JOB_SEEKER ? "Applied Jobs" : "Posted Jobs"} />
              </Tabs>
              <Box sx={{ mt: 2 }}>
                {tabIndex === 0 && (
                  <Typography variant="body1" color="textSecondary">
                    Overview information about the user’s job-related details.
                  </Typography>
                )}
                {tabIndex === 1 && (
                  <>
                  <Typography variant="body1" color="textSecondary">
                    Overview information about the user’s job-related details.
                  </Typography>
                    <List>
                      {(user?.jobs || []).map((job, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={job.title}
                            secondary={`Date: ${format(new Date(job.date), "MMMM dd, yyyy")}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={5}>
      <Card elevation={3} sx={{ borderRadius: 2, flex: 1,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease-in-out',}}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary.main">
              Recent Activity
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {user?.activity?.map((activity, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={activity.description}
                    secondary={`Date: ${format(new Date(activity.date), "MMMM dd, yyyy")}`}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default MyProfile;
