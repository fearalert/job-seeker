import {
  Container,
  Typography,
  Paper,
  IconButton,
  useTheme,
  Box,
} from "@mui/material";
import { AccountCircle, Search, Handshake, DirectionsWalk } from "@mui/icons-material";

const steps = [
  {
    title: "Create an Account",
    description:
      "Sign up easily to access all features. Complete your profile and verify your email to get started.",
    icon: <AccountCircle fontSize="large" />,
  },
  {
    title: "Post or Browse Jobs",
    description:
      "Employers can post job opportunities, while job seekers can browse listings tailored to their skills.",
    icon: <Search fontSize="large" />,
  },
  {
    title: "Hire or Get Hired",
    description:
      "Employers review applications and conduct interviews. Job seekers can apply for jobs and connect with employers.",
    icon: <Handshake fontSize="large" />,
  },
  {
    title: "Start Your Journey",
    description:
      "Network with professionals and manage your opportunities in one place.",
    icon: <DirectionsWalk fontSize="large" />,
  },
];

const Working = () => {
  const theme = useTheme();
  return (
    <Container sx={{ my: theme.spacing(5), p: theme.spacing(2) }}>
  <Typography
    variant="h4"
    align="center"
    fontWeight="bold"
    gutterBottom
    color={theme.palette.primary.main}
    marginBottom={theme.spacing(4)}
  >
    How Does It Work
  </Typography>
  <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(4),
      borderRadius: 2,
      p: theme.spacing(4),
      backgroundColor: theme.palette.primary.main,
    }}>
    {steps.map((step, index) => (
       <Paper
         key={index}
         elevation={3}
         sx={{
           p: theme.spacing(3),
           textAlign: "left",
           backgroundColor: theme.palette.background.default,
           transition: 'background-color 0.3s ease',
           '&:hover': {
             backgroundColor: theme.palette.tertiary.dark,
             color: theme.palette.background.default,
           },
         }}
       >
         <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 56,
              height: 56,
              borderRadius: '50%',
              backgroundColor: theme.palette.primary.light,
              mb: theme.spacing(2),
            }}>
          <IconButton sx={{ color: theme.palette.background.paper }}>
            {step.icon}
          </IconButton>
         </Box>
         <Typography variant="h5" sx={{ mb: theme.spacing(1), fontWeight: "bold" }}>
           {step.title}
         </Typography>
         <Typography variant="body2">
           {step.description}
         </Typography>
       </Paper>
    ))}
  </Box>
  </Container>
  );
};

export default Working;
