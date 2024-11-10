import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostApplication from './pages/postapplication/PostApplication';
import NotFound from './pages/notfound/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Container } from "@mui/material";
import Dashboard from "./pages/Dashboard/Dashboard";
import EmployeerLogin from "./pages/login/employeer/EmployeerLogin";
import JobSeekerLogin from "./pages/login/JobSeeker/JobSeekerLogin";
import EmployeerRegister from "./pages/register/Employeer/EmployerRegister";
import JobSeekRegister from "./pages/register/JobSeeker/JobSeekRegister";
import HomePage from "./pages/Home/Home";
import JobsPage from "./pages/Jobs/JobsPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Container variant="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post/application/:JobId" element={<PostApplication />} />
          <Route path="/register/employer" element={<EmployeerRegister />} />
          <Route path="/register/job-seeker" element={<JobSeekRegister />} />
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
