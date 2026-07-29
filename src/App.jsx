import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GNB from '@/components/GNB/index.jsx';
import Login from '@/pages/Login';
import FindPassword from './pages/FindPassword';
import SignUp from '@/pages/SignUp';
import About from '@/pages/About';
import Activity from './pages/Activity';
import Home from '@/pages/Home';
import Project from '@/pages/Project';
import ProjectDetail from './pages/ProjectDetail';
import Community from './pages/Community';
import Community1Detail from '@/pages/Community1Detail';
import PostForm from './pages/Community/components/PostForm';
import PostComplete from './pages/Community/components/PostForm/PostComplete';
import Application from './pages/Application';
import RequireAuth from '@/components/RequireAuth';

function App() {
  return (
    <BrowserRouter>
      <GNB />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/find-password" element={<FindPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/project" element={<Project />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route
          path="/community"
          element={
            <RequireAuth>
              <Community />
            </RequireAuth>
          }
        />
        <Route
          path="/community/write"
          element={
            <RequireAuth>
              <PostForm />
            </RequireAuth>
          }
        />
        <Route
          path="/community/:id"
          element={
            <RequireAuth>
              <Community1Detail />
            </RequireAuth>
          }
        />
        <Route
          path="/community/complete"
          element={
            <RequireAuth>
              <PostComplete />
            </RequireAuth>
          }
        />
        <Route
          path="/application"
          element={
            <RequireAuth>
              <Application />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
