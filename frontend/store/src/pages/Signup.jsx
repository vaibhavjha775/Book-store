import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    address: ''
  });
  const [msg, setMsg] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    console.log('Form data:', form); // Debugging line to check form data
    const res = await axios.post('/api/v1/sign-up', form);
    console.log(res.data);
    setMsg(res.data.message || 'Sign up successful');
    setShowSuccess(true);

    // Auto-close popup and redirect
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/signin');
    }, 2000);
  } catch (err) {
    setMsg(err.response?.data?.message || 'Something went wrong');
    setShowSuccess(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <div className="bg-zinc-300 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {showSuccess && (
  <div className="mb-4 p-3 text-green-800 bg-green-200 border border-green-600 rounded text-center font-semibold transition duration-300">
    ✅ {msg}
  </div>
)}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
          >
            Sign Up
          </button>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        
        <div>
           Already have an account?
          <button
          onClick={() => navigate('/signin')}
          className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 font-semibold"
        >
          Login
        </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;