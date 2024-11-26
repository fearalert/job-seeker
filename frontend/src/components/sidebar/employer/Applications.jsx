import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Card, CardContent, Typography, Button, Grid, CircularProgress, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { clearAllApplicationErrors, deleteApplication, fetchEmployerApplications, resetApplicationSlice } from "../../../store/slices/applicationSlice";
import { theme } from "../../../themes/theme";
import { ErrorOutlineTwoTone } from "@mui/icons-material";

const Applications = () => {
  const { applications, loading, error, message } = useSelector(
    (state) => state.applications
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchEmployerApplications());
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <>
      {loading ? 
      (<Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>)
       : applications && applications.length <= 0 ? (
        <Box  sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: theme.palette.background.default,
        }}>
            <ErrorOutlineTwoTone sx={{ fontSize: 80, color: theme.palette.error.main }} />
            <Typography variant="h6" color="primary.main" align="center">
            You have no applications from job seekers.
          </Typography>
        </Box>
        
      ) : (
        <div className="account_components">
          <Typography variant="h5" gutterBottom>
            Applications For Your Posted Jobs
          </Typography>
          <Grid container spacing={2}>
            {applications.map((element) => (
              <Grid item xs={12} sm={6} md={4} key={element._id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Job Title: {element.jobInfo.jobTitle}
                    </Typography>
                    <Typography variant="subtitle1">
                      Applicants Name: {element.jobSeekerInfo.name}
                    </Typography>
                    <Typography variant="subtitle2">
                      Applicants Email: {element.jobSeekerInfo.email}
                    </Typography>
                    <Typography variant="subtitle2">
                      Applicants Phone: {element.jobSeekerInfo.phone}
                    </Typography>
                    <Typography variant="subtitle2">
                      Applicants Address: {element.jobSeekerInfo.address}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      Applicants Cover Letter:
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {element.jobSeekerInfo.coverLetter}
                    </Typography>
                    <div className="btn-wrapper">
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteApplication(element._id)}
                      >
                        Delete Application
                      </Button>
                      <Link
                        to={
                          element.jobSeekerInfo &&
                          element.jobSeekerInfo.resume.url
                        }
                        target="_blank"
                        style={{ textDecoration: "none" }}
                      >
                        <Button variant="contained" color="primary">
                          View Resume
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
};

export default Applications;
