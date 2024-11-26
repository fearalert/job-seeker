import { useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  IconButton,
  Avatar,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import WorkIcon from "@mui/icons-material/Work";
import DescriptionIcon from "@mui/icons-material/Description";
import LogoutIcon from "@mui/icons-material/Logout";
import { clearAllUserError, logout, fetchUser } from "../../store/slices/userSlice";
import MyProfile from "../../components/sidebar/MyProfile";
import UpdateProfile from "../../components/sidebar/UpdateProfile";
import JobPost from "../../components/sidebar/employer/JobPost";
import MyJobs from "../../components/sidebar/employer/MyJobs";
import Applications from "../../components/sidebar/employer/Applications";
import MyApplications from "../../components/sidebar/user/MyApplications";
import { DashboardRounded } from "@mui/icons-material";
import DashboardHome from "../../components/sidebar/DashHome";
import { ROLES } from "../../constants";
import Jobs from "../../components/sidebar/user/Jobs";
import UpdatePassword from "../../components/sidebar/UpdatePassword";

const DashboardPage = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [componentName, setComponentName] = useState("DashHome");

  const { isAuthenticated, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (token && !isAuthenticated) {
      dispatch(fetchUser());
    }
    
    if (error) {
      toast.error(error);
      dispatch(clearAllUserError());
    }

    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, isAuthenticated, navigateTo]);

  const sidebarItems = [
    { label: "Home", component: <DashboardHome />, icon: < DashboardRounded/> },
    { label: "My Profile", component: <MyProfile />, icon: <AccountCircleIcon /> },
    { label: "Update Profile", component: <UpdateProfile />, icon: <EditIcon /> },
    { label: "Update Password", component: <UpdatePassword />, icon: <LockIcon /> },
  ];

  if (user && user.role === ROLES.EMPLOYER) {
    sidebarItems.push(
      { label: "Post New Job", component: <JobPost />, icon: <WorkIcon /> },
      { label: "My Jobs", component: <MyJobs />, icon: <DescriptionIcon /> },
      { label: "Applications", component: <Applications />, icon: <DescriptionIcon /> }
    );
  } else if (user && user.role === ROLES.JOB_SEEKER) {
    sidebarItems.push({ label: "My Applications", component: <MyApplications />, icon: <DescriptionIcon /> });
    sidebarItems.push({ label: "Jobs", component: <Jobs />, icon: <WorkIcon /> });
  }

  const drawerContent = (
    <Box sx={{ width: 240 }}>
      <Box display="flex" alignItems="center" p={2} bgcolor="primary.main" color="white">
        <Avatar sx={{ bgcolor: "secondary.main", mr: 2 }}>{user?.name?.charAt(0)}</Avatar>
        <Box>
          <Typography variant="body1"><strong>{user?.name}</strong></Typography>
          <Typography variant="body2" color="inherit">{user?.role}</Typography>
        </Box>
      </Box>
      <Divider />
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
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
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
            Welcome, <strong>{user && user.name}</strong>
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
        {(() => {
          const activeItem = sidebarItems.find(
            (item) => item.label === componentName
          );
          return activeItem ? activeItem.component : <DashboardHome />;
        })()}
      </Box>
    </Box>
  );
};

export default DashboardPage;