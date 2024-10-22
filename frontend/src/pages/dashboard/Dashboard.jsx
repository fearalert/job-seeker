import { useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MenuIcon from "@mui/icons-material/Menu";
import LuMoveRight from "@mui/icons-material/ArrowForwardIos";
import { clearAllUserError, logout } from "../../store/slices/userSlice";
import MyProfile from "../../components/sidebar/MyProfile";
import UpdateProfile from "../../components/sidebar/UpdateProfile";
import JobPost from "../../components/sidebar/employer/JobPost";
import MyJobs from "../../components/sidebar/employer/MyJobs";
import Applications from "../../components/sidebar/employer/Applications";
import MyApplications from "../../components/sidebar/user/MyApplications";

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [componentName, setComponentName] = useState("My Profile");

  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserError());
    }
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated, navigateTo]);

  const sidebarItems = [
    { label: "My Profile", component: <MyProfile /> },
    { label: "Update Profile", component: <UpdateProfile /> },
    { label: "Update Password", component: <UpdateProfile /> },
  ];

  if (user && user.role === "Employer") {
    sidebarItems.push(
      { label: "Post New Job", component: <JobPost /> },
      { label: "My Jobs", component: <MyJobs /> },
      { label: "Applications", component: <Applications /> }
    );
  } else if (user && user.role === "Job Seeker") {
    sidebarItems.push({ label: "My Applications", component: <MyApplications /> });
  }

  const drawerContent = (
    <List>
      {sidebarItems.map((item, index) => (
        <ListItem
          button
          key={index}
          onClick={() => {
            setComponentName(item.label);
            setShowSidebar(false);
          }}
        >
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
      <ListItem button onClick={handleLogout}>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Typography variant="subtitle1">
            Welcome! <strong>{user && user.name}</strong>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={showSidebar}
        onClose={() => setShowSidebar(false)}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, marginTop: "64px" }}
      >
        <IconButton
          onClick={() => setShowSidebar(!showSidebar)}
          sx={{ mb: 2 }}
          color="primary"
        >
          <LuMoveRight />
        </IconButton>
        {(() => {
          const activeItem = sidebarItems.find(
            (item) => item.label === componentName
          );
          return activeItem ? activeItem.component : <MyProfile />;
        })()}
      </Box>
    </Box>
  );
};

export default Dashboard;
