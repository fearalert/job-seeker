import './App.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Jobs from './pages/jobs/Jobs';
import Home from './pages/home/Home';
import PostApplication from './pages/postapplication/PostApplication';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import NotFound from './pages/notfound/NotFound';

function App() {

  return (
    <>
     <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post/application/:JobId" element={<PostApplication />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
     </Router>
    </>
  )
}

export default App
