import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PostApplication from './pages/postapplication/PostApplication';
import NotFound from './pages/notfound/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Container, CircularProgress, Box } from "@mui/material";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import HomePage from "./pages/Home/HomePage";
import JobsPage from "./pages/Jobs/JobsPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./store/slices/userSlice";
import JobSeekerRegister from "./pages/register/JobSeeker/JobSeekRegister";
import JobSeekerLogin from "./pages/login/JobSeeker/JobSeekLogin";
import EmployerLogin from "./pages/login/Employeer/EmployeerLogin";
import EmployerRegister from "./pages/register/Employeer/EmployerRegister";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    console.log("Token App:", token);
    console.log("Is Authenticated", isAuthenticated);
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
          <Route path="/register/employer" element={<EmployerRegister />} />
          <Route path="/register/job-seeker" element={<JobSeekerRegister />} />
          <Route path="/login/employer" element={<EmployerLogin />} />
          <Route path="/login/job-seeker" element={<JobSeekerLogin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
