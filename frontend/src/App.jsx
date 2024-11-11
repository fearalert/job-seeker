import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PostApplication from './pages/postapplication/PostApplication';
import NotFound from './pages/notfound/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Container, CircularProgress, Box } from "@mui/material";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import HomePage from "./pages/Home/HomePage";
import JobsPage from "./pages/Jobs/JobsPage";
import EmployeerLogin from "./pages/login/employeer/EmployeerLogin";
import EmployeerRegister from "./pages/register/Employeer/EmployerRegister";
import JobSeekRegister from "./pages/register/JobSeeker/JobSeekRegister";
import JobSeekLogin from "./pages/login/JobSeeker/JobSeekLogin";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./store/slices/userSlice";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    console.log("Token App:", token);
    if (token && !isAuthenticated) {
      dispatch(fetchUser());
    }
  }, [dispatch, isAuthenticated]);
  
  

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Router>
      <Navbar />
      <Container variant="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login/job-seeker" />}
          />
          <Route
            path="/post/application/:JobId"
            element={isAuthenticated ? <PostApplication /> : <Navigate to="/login/job-seeker" />}
          />
          <Route path="/register/employer" element={<EmployeerRegister />} />
          <Route path="/register/job-seeker" element={<JobSeekRegister />} />
          <Route path="/login/employer" element={<EmployeerLogin />} />
          <Route path="/login/job-seeker" element={<JobSeekLogin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
