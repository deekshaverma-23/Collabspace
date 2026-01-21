import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Join CollabSpace</h2>
        <input 
          type="text" placeholder="Username" 
          className="w-full p-2 mb-4 bg-gray-700 rounded border border-gray-600 outline-none focus:border-blue-500"
          onChange={(e) => setFormData({...formData, username: e.target.value})} 
          required 
        />
        <input 
          type="email" placeholder="Email" 
          className="w-full p-2 mb-4 bg-gray-700 rounded border border-gray-600 outline-none focus:border-blue-500"
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
          required 
        />
        <input 
          type="password" placeholder="Password" 
          className="w-full p-2 mb-6 bg-gray-700 rounded border border-gray-600 outline-none focus:border-blue-500"
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
          required 
        />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-bold transition">
          Register
        </button>
        <p className="mt-4 text-sm text-center">
          Already have an account? <Link to="/login" className="text-blue-400 underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;