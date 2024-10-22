import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchUser } from './store/slices/userSlice'; // Import the fetchUser action
import Jobs from './pages/jobs/Jobs';
import Home from './pages/home/Home';
import PostApplication from './pages/postapplication/PostApplication';
import Dashboard from './pages/dashboard/Dashboard';
import NotFound from './pages/notfound/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Container } from "@mui/material";
import EmployeerLogin from "./pages/login/employeer/EmployeerLogin";
import JobSeekerLogin from "./pages/login/jobseeker/JobSeekerLogin";
import Register from "./pages/register/Register";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Container variant="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post/application/:JobId" element={<PostApplication />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login/employer" element={<EmployeerLogin />} />
          <Route path="/login/job-seeker" element={<JobSeekerLogin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
