import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const InputField = ({ label, type = 'text', value, onChange, name }) => (
  <div className='w-full flex flex-col mb-4'>
    <label className='mb-1 text-gray-600'>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className='border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:outline-none'
      required
    />
  </div>
);

const Login = () => {
  const [formType, setFormType] = useState('Sign Up'); // 'Sign Up' or 'Login'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = formData;

  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url =
        formType === 'Sign Up'
          ? `${backendUrl}/api/user/register`
          : `${backendUrl}/api/user/login`;

      const payload =
        formType === 'Sign Up'
          ? { name, email, password }
          : { email, password };

      const { data } = await axios.post(url, payload);

      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    if (token) navigate('/');
  }, [token, navigate]);

  return (
    <div className='min-h-[80vh] flex items-center justify-center bg-gray-50'>
      <div className='flex flex-col sm:flex-row w-full max-w-4xl shadow-xl rounded-xl overflow-hidden bg-white'>
        {/* Left Side - Info Panel */}
        <div className='sm:w-1/2 bg-primary text-white p-8 flex flex-col justify-center'>
          <h2 className='text-3xl font-bold mb-2'>
            {formType === 'Sign Up' ? 'Welcome!' : 'Hello Again!'}
          </h2>
          <p className='mb-4'>
            {formType === 'Sign Up'
              ? 'Sign up to book appointments easily.'
              : 'Login to access your account and manage appointments.'}
          </p>
          <button
            onClick={() => setFormType(formType === 'Sign Up' ? 'Login' : 'Sign Up')}
            className='mt-auto bg-white text-primary py-2 px-4 rounded-md font-semibold hover:bg-gray-100 transition'
          >
            {formType === 'Sign Up' ? 'Already have an account?' : 'Create new account'}
          </button>
        </div>

        {/* Right Side - Form */}
        <form
          onSubmit={handleSubmit}
          className='sm:w-1/2 p-8 flex flex-col justify-center'
        >
          <h2 className='text-2xl font-semibold mb-4'>
            {formType === 'Sign Up' ? 'Create Account' : 'Login'}
          </h2>

          {formType === 'Sign Up' && (
            <InputField
              label='Full Name'
              type='text'
              value={name}
              onChange={handleChange}
              name='name'
            />
          )}
          <InputField
            label='Email'
            type='email'
            value={email}
            onChange={handleChange}
            name='email'
          />
          <InputField
            label='Password'
            type='password'
            value={password}
            onChange={handleChange}
            name='password'
          />

          <button className='bg-primary text-white py-2 rounded-lg font-semibold mt-4 hover:bg-primary-dark transition'>
            {formType === 'Sign Up' ? 'Create Account' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;