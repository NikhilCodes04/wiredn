import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import Signup from './components/Signup';
import { Projects } from './components/Projects';
import ProjectDetails from './components/ProjectDetails';
import FindTeammates from './components/FindTeammates';  // Updated path
import FindMentor from './components/FindMentor';  // Updated path
import ViewRequests from './components/ViewRequests';
import Requests from './components/Requests';
import AddProject from './components/AddProject';
import ViewProjects from './components/Dashboard/ViewProjects';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/projects"
                    element={
                        <ProtectedRoute>
                            <Projects />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/projects/:id"
                    element={
                        <ProtectedRoute>
                            <ProjectDetails />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/projects/:projectId/find-teammates"
                    element={
                        <ProtectedRoute>
                            <FindTeammates />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/projects/:projectId/find-mentor"
                    element={
                        <ProtectedRoute>
                            <FindMentor />
                        </ProtectedRoute>
                    }
                />
                <Route path="/view-requests" element={<ViewRequests />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/add-project" element={<AddProject/>} />
                <Route path="/view-project" element={<ViewProjects/>} />

            </Routes>
        </Router>
    );
}

export default App;
