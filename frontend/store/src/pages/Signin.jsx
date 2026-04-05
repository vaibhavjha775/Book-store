import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signin = () => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
 const [msg, setMsg] = useState('');
const [msgType, setMsgType] = useState(''); // 'success' | 'error'


  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res =  await axios.post('/api/v1/sign-in', form);
      navigate('/');
      setMsgType('success');
     
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response.data.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
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
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold hover:shadow-lg transition duration-300 cursor-pointer"
          >
            Login
          </button>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <button
          onClick={() => navigate('/signup')}
          className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 font-semibold"
        >
          Don't have an account? Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signin;