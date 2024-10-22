import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  resetApplicationSlice,
  deleteApplication,
  fetchJobSeekerApplications,
} from "../../../store/slices/applicationSlice";
import {
  CircularProgress,
  Box,
  Typography,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { ErrorOutlineRounded } from "@mui/icons-material";
import { theme } from "../../../themes/theme";

const MyApplications = () => {
  // const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, error, applications, message } = useSelector(
    (state) => state.applications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobSeekerApplications());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
      dispatch(fetchJobSeekerApplications());
    }
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          <CircularProgress color="primary" />
        </Box>
      ) : applications && applications.length <= 0 ? (
        <Box  sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: theme.palette.background.default,
        }}>
            <ErrorOutlineRounded sx={{ fontSize: 80, color: theme.palette.error.main }} />
            <Typography variant="h6" color="primary.main" align="center">
            You have not applied to job yet.
          </Typography>
    </Box>
      ) : (
        <Box>
          <Typography variant="h5" gutterBottom>
            My Application For Jobs
          </Typography>
          <Box>
            {applications.map((element) => (
              <Box
                className="card"
                key={element._id}
                sx={{
                  padding: "16px",
                  border: "1px solid #E0E0E0",
                  borderRadius: "8px",
                  marginBottom: "16px",
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography className="sub-sec">
                  <strong>Job Title:</strong> {element.jobInfo.jobTitle}
                </Typography>
                <Typography className="sub-sec">
                  <strong>Name:</strong> {element.jobSeekerInfo.name}
                </Typography>
                <Typography className="sub-sec">
                  <strong>Email:</strong> {element.jobSeekerInfo.email}
                </Typography>
                <Typography className="sub-sec">
                  <strong>Phone:</strong> {element.jobSeekerInfo.phone}
                </Typography>
                <Typography className="sub-sec">
                  <strong>Address:</strong> {element.jobSeekerInfo.address}
                </Typography>
                <Typography className="sub-sec">
                  <strong>Cover Letter:</strong>
                  <TextareaAutosize
                    value={element.jobSeekerInfo.coverLetter}
                    rows={5}
                    disabled
                    style={{ width: "100%", marginTop: "8px" }}
                  />
                </Typography>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteApplication(element._id)}
                  >
                    Delete Application
                  </Button>
                  <Button
                    component={RouterLink}
                    to={element.jobSeekerInfo && element.jobSeekerInfo.resume.url}
                    variant="contained"
                    color="primary"
                    target="_blank"
                  >
                    View Resume
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default MyApplications;
