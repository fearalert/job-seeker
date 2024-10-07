import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
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
  return (
     <Router>
        <Navbar />
        <Container variant="main" >
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
  )
}

export default App
