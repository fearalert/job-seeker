import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { CircleTwoTone } from "@mui/icons-material";
import { clearAllJobErrors, postJob, resetJobSlices } from "../../../store/slices/jobSlice";
import { NICHE_OPTIONS } from "../../../constants";

const JobPost = () => {
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [offers, setOffers] = useState("");
  const [jobNiche, setJobNiche] = useState("");
  const [salary, setSalary] = useState("");
  const [hiringMultipleCandidates, setHiringMultipleCandidates] = useState("");
  const [personalWebsiteTitle, setPersonalWebsiteTitle] = useState("");
  const [personalWebsiteUrl, setPersonalWebsiteUrl] = useState("");

  const cities = [
    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Hyderabad",
    "Quetta",
    "Peshawar",
    "Sialkot",
    "Gujranwala",
    "Sargodha",
    "Bahawalpur",
    "Sukkur",
    "Mardan",
    "Mingora",
    "Sheikhupura",
    "Mandi Bahauddin",
    "Larkana",
    "Nawabshah",
  ];

  const { loading, error, message } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  const handlePostJob = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("jobType", jobType);
    formData.append("location", location);
    formData.append("companyName", companyName);
    formData.append("introduction", introduction);
    formData.append("responsibilities", responsibilities);
    formData.append("qualifications", qualifications);
    offers && formData.append("offers", offers);
    formData.append("jobNiche", jobNiche);
    formData.append("salary", salary);
    hiringMultipleCandidates &&
      formData.append("hiringMultipleCandidates", hiringMultipleCandidates);
    personalWebsiteTitle &&
      formData.append("personalWebsiteTitle", personalWebsiteTitle);
    personalWebsiteUrl &&
      formData.append("personalWebsiteUrl", personalWebsiteUrl);

    dispatch(postJob(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlices());
    }
  }, [dispatch, error, message]);

  return (
    <Box variant="default" sx={{ maxWidth: 600, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom align="center">
        Post A Job
      </Typography>
      <form onSubmit={handlePostJob}>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job Title"
            required
            variant="outlined"
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Job Type</InputLabel>
          <Select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            required
          >
            <MenuItem value="">Select Job Type</MenuItem>
            <MenuItem value="Full-time">Full-time</MenuItem>
            <MenuItem value="Part-time">Part-time</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Location (City)</InputLabel>
          <Select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          >
            <MenuItem value="">Select Location</MenuItem>
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Company Name"
            required
            variant="outlined"
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Company/Job Introduction"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder="Company / Job Introduction"
            multiline
            rows={4}
            required
            variant="outlined"
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Responsibilities"
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
            placeholder="Job Responsibilities"
            multiline
            rows={4}
            required
            variant="outlined"
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Qualifications"
            value={qualifications}
            onChange={(e) => setQualifications(e.target.value)}
            placeholder="Required Qualifications For Job"
            multiline
            rows={4}
            required
            variant="outlined"
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Typography variant="body2" gutterBottom>
            What We Offer <CircleTwoTone style={{ verticalAlign: "middle" }} /> Optional
          </Typography>
          <TextField
            value={offers}
            onChange={(e) => setOffers(e.target.value)}
            placeholder="What are we offering in return!"
            multiline
            rows={4}
            variant="outlined"
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Job Niche</InputLabel>
          <Select
            value={jobNiche}
            onChange={(e) => setJobNiche(e.target.value)}
            required
          >
            <MenuItem value="">Select Job Niche</MenuItem>
            {NICHE_OPTIONS.map((niche) => (
              <MenuItem key={niche} value={niche}>
                {niche}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="50000 - 800000"
            required
            variant="outlined"
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Typography variant="body2" gutterBottom>
            Hiring Multiple Candidates? <CircleTwoTone style={{ verticalAlign: "middle" }} /> Optional
          </Typography>
          <Select
            value={hiringMultipleCandidates}
            onChange={(e) => setHiringMultipleCandidates(e.target.value)}
          >
            <MenuItem value="">Hiring Multiple Candidates?</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Typography variant="body2" gutterBottom>
            Personal Website Name <CircleTwoTone style={{ verticalAlign: "middle" }} /> Optional
          </Typography>
          <TextField
            value={personalWebsiteTitle}
            onChange={(e) => setPersonalWebsiteTitle(e.target.value)}
            placeholder="Personal Website Name/Title"
            variant="outlined"
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Typography variant="body2" gutterBottom>
            Personal Website Link (URL) <CircleTwoTone style={{ verticalAlign: "middle" }} /> Optional
          </Typography>
          <TextField
            value={personalWebsiteUrl}
            onChange={(e) => setPersonalWebsiteUrl(e.target.value)}
            placeholder="Personal Website Link (URL)"
            variant="outlined"
          />
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          disabled={loading}
          sx={{ marginTop: 3, padding: "12px 24px", borderRadius: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Post Job'}
        </Button>
      </form>
    </Box>
  );
};

export default JobPost;
