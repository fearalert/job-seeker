import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Divider,
  Container,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { NICHE_OPTIONS, ROLES } from "../../constants";
import { clearAllUpdateProfileErrors, updateProfile } from "../../store/slices/updateProfileSlice";
import { fetchUser } from "../../store/slices/userSlice";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector((state) => state.updateProfile);
  const dispatch = useDispatch();

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [address, setAddress] = useState(user && user.address);
  const [coverLetter, setCoverLetter] = useState(user && user.coverLetter);
  const [firstNiche, setFirstNiche] = useState(user && user.niches?.firstNiche);
  const [secondNiche, setSecondNiche] = useState(user && user.niches?.secondNiche);
  const [thirdNiche, setThirdNiche] = useState(user && user.niches?.thirdNiche);
  const [resume, setResume] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [resumePreview, setResumePreview] = useState(user && user.resume?.url);

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    if (user && user.role === ROLES.JOB_SEEKER) {
      formData.append("firstNiche", firstNiche);
      formData.append("secondNiche", secondNiche);
      formData.append("thirdNiche", thirdNiche);
      formData.append("coverLetter", coverLetter);
    }
    if (resume) {
      formData.append("resume", resume);
    }
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated.");
      dispatch(fetchUser());
      dispatch(clearAllUpdateProfileErrors());
    }
  }, [dispatch, loading, error, isUpdated, user]);

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  return (
    <Container maxWidth="md" sx={{ mt: 1 }}>
      <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
        <Avatar sx={{ bgcolor: "primary.main", width: 80, height: 80, mb: 2 }}>
          <PersonIcon fontSize="large" />
        </Avatar>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Update Profile
        </Typography>
      </Box>
      <Card elevation={3} sx={{ p: 3, borderRadius: 2, boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Typography variant="h6" color="primary.main" gutterBottom>
            Basic Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email Address"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Phone Number"
            type="tel"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          {user?.role === ROLES.JOB_SEEKER && (
            <>
              <Typography variant="h6" gutterBottom color="primary.main">
                Job Preferences
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {[firstNiche, secondNiche, thirdNiche].map((niche, index) => (
                <Select
                  key={index}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={niche}
                  onChange={(e) => {
                    if (index === 0) setFirstNiche(e.target.value);
                    if (index === 1) setSecondNiche(e.target.value);
                    if (index === 2) setThirdNiche(e.target.value);
                  }}
                >
                  {NICHE_OPTIONS.map((option, idx) => (
                    <MenuItem value={option} key={idx}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              ))}
              <TextField
                label="Cover Letter"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                margin="normal"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
              <Typography variant="body2" color="textSecondary" mt={2}>
                Upload Resume
              </Typography>
              <input type="file" onChange={resumeHandler} />
            </>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleUpdateProfile}
            disabled={loading}
            sx={{ mt: 3 }}
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UpdateProfile;
