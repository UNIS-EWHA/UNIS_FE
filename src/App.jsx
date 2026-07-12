import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GNB from '@/components/GNB/index.jsx';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import About from '@/pages/About';
import Activity from './pages/Activity';
import Home from '@/pages/Home';
import Project from '@/pages/Project';
import ProjectDetail from './pages/ProjectDetail';
import Community from './pages/Community';

function App() {
  return (
    <BrowserRouter>
      <GNB />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/project" element={<Project />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
