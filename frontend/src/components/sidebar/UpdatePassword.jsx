import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Divider,
  Container,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { clearAllUpdateProfileErrors, updatePassword } from "../../store/slices/updateProfileSlice";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const { loading, error, isUpdated } = useSelector((state) => state.updateProfile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if (isUpdated) {
      toast.success("Password Updated.");
      dispatch(clearAllUpdateProfileErrors());
    }
  }, [dispatch, loading, error, isUpdated]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
        <Avatar sx={{ bgcolor: "primary.main", width: 80, height: 80, mb: 2 }}>
          <LockIcon fontSize="large" />
        </Avatar>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Update Password
        </Typography>
      </Box>
      <Card elevation={3} sx={{ p: 3, borderRadius: 2, boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <CardContent>
          <Typography variant="h6" color="primary.main" gutterBottom>
            Change Your Password
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <TextField
            label="Old Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <TextField
            label="New Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="Confirm New Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleUpdatePassword}
            disabled={loading}
            sx={{ mt: 3 }}
          >
            Update Password
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UpdatePassword;
