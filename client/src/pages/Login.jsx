import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import API from '../api/axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', formData);
      // Save user and token to Redux + LocalStorage
      dispatch(setCredentials({ user: data.user, token: data.token }));
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
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
          Login
        </button>
        <p className="mt-4 text-sm text-center">
          New here? <Link to="/register" className="text-blue-400 underline">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;