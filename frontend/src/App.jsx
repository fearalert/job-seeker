import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostApplication from './pages/postapplication/PostApplication';
import NotFound from './pages/notfound/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Container } from "@mui/material";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import HomePage from "./pages/Home/HomePage";
import JobsPage from "./pages/Jobs/JobsPage";
import EmployeerLogin from "./pages/login/employeer/EmployeerLogin";
import EmployeerRegister from "./pages/register/Employeer/EmployerRegister";
import JobSeekRegister from "./pages/register/JobSeeker/JobSeekRegister";
import JobSeekerLogin from "./pages/login/JobSeeker/JobSeekerLogin";

function App() {
  return (
    <Router>
      <Navbar />
      <Container variant="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
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
