import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useTheme } from "@mui/material/styles";

const NotFound = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, color: theme.palette.error.main }} />
      <Typography variant="h1" sx={{ mt: 2, fontWeight: "bold" }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mt: 1 }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, mb: 4 }}>
        This page does not exist on the website.
      </Typography>
      <Button variant="contained" component={Link} to="/" sx={{ mt: 2 }}>
        Go to Homepage
      </Button>
    </Box>
  );
};

export default NotFound;
