import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  clearAllApplicationErrors,
  postApplication,
  resetApplicationSlice,
} from "../../store/slices/applicationSlice";
import { toast } from "react-toastify";
import { fetchSingleJob } from "../../store/slices/jobSlice";
import { IoMdCash } from "react-icons/io";
import { FaToolbox } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Paper,
  Grid,
} from "@mui/material";

const PostApplication = () => {
  const { singleJob } = useSelector((state) => state.jobs);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector((state) => state.applications);
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");

  const dispatch = useDispatch();

  const handlePostApplication = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    if (resume) {
      formData.append("resume", resume);
    }
    dispatch(postApplication(formData, jobId));
  };

  useEffect(() => {
    if (!isAuthenticated || user.role !== "Job Seeker") {
      navigate("/");
    }

    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setCoverLetter(user.coverLetter || "");
      setResume((user.resume && user.resume.url) || "");
    }
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchSingleJob(jobId));
  }, [dispatch, error, message, jobId, user, navigate, isAuthenticated]);

  const qualifications = singleJob.qualifications?.split(". ") || [];
  const responsibilities = singleJob.responsibilities?.split(". ") || [];
  const offering = singleJob.offers?.split(". ") || [];

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Application Form
      </Typography>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <form onSubmit={handlePostApplication}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Job Title"
                value={singleJob.title}
                disabled
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Your Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            {user?.role === "Job Seeker" && (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Cover Letter"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    accept="application/pdf"
                    style={{ display: "none" }}
                    id="resume-upload"
                    type="file"
                    onChange={resumeHandler}
                  />
                  <label htmlFor="resume-upload">
                    <Button variant="outlined" component="span">
                      Upload Resume
                    </Button>
                  </label>
                </Grid>
              </>
            )}
            {isAuthenticated && user?.role === "Job Seeker" && (
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  fullWidth
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Apply"}
                </Button>
              </Grid>
            )}
          </Grid>
        </form>
      </Paper>

      <Box mt={4}>
        <Typography variant="h5">{singleJob.title}</Typography>
        {singleJob.personalWebsite && (
          <Link target="_blank" to={singleJob.personalWebsite.url}>
            {singleJob.personalWebsite.title}
          </Link>
        )}
        <Typography variant="subtitle1">{singleJob.location}</Typography>
        <Typography variant="subtitle1">Rs. {singleJob.salary} a month</Typography>
      </Box>

      <Paper elevation={2} sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant="h6">Job Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center">
              <IoMdCash style={{ marginRight: 8 }} />
              <Typography>Pay: {singleJob.salary} a month</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center">
              <FaToolbox style={{ marginRight: 8 }} />
              <Typography>Job Type: {singleJob.jobType}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={2} sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant="h6">Location</Typography>
        <Box display="flex" alignItems="center">
          <FaLocationDot style={{ marginRight: 8 }} />
          <Typography>{singleJob.location}</Typography>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant="h6">Full Job Description</Typography>
        <Typography>{singleJob.introduction}</Typography>
        {qualifications.length > 0 && (
          <Box mt={2}>
            <Typography variant="h6">Qualifications</Typography>
            <ul>
              {qualifications.map((element, index) => (
                <li key={index}>{element}</li>
              ))}
            </ul>
          </Box>
        )}
        {responsibilities.length > 0 && (
          <Box mt={2}>
            <Typography variant="h6">Responsibilities</Typography>
            <ul>
              {responsibilities.map((element, index) => (
                <li key={index}>{element}</li>
              ))}
            </ul>
          </Box>
        )}
        {offering.length > 0 && (
          <Box mt={2}>
            <Typography variant="h6">Offering</Typography>
            <ul>
              {offering.map((element, index) => (
                <li key={index}>{element}</li>
              ))}
            </ul>
          </Box>
        )}
      </Paper>

      <Paper elevation={2} sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant="h6">Job Niche</Typography>
        <Typography>{singleJob.jobNiche}</Typography>
      </Paper>
    </Box>
  );
};

export default PostApplication;
