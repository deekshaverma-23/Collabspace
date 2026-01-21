import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

// Simple placeholder for testing
const Dashboard = () => (
  <div className="min-h-screen bg-gray-900 text-white p-10">
    <h1 className="text-3xl font-bold">Workspace Dashboard</h1>
    <p className="mt-4">If you can see this, you are logged in!</p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;