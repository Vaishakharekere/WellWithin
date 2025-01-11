import axios from 'axios';
import React, { useState } from 'react';
import './Login.css';
import Button from '../../components/Button/Button';
import { useAuth } from '../../context/authContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const {login} = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    axios
      .post('http://localhost:5000/api/users/login', formData)
      .then((response) => {
        if(response.data.ok){
          console.log('Login successful:', response)
          console.log(response)
          login(response.data.token,response.data.userId,response.data.role);
          setSuccess(true);
          setFormData({
            email: '',
            password: '',
          });
        } else {
          setError(response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Error' + error);
      });
  };

  return (
    <div className="login">
      <h1>Login</h1>

      <form onSubmit={handleSubmit} className="login-form">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Login successful!</div>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <Button content="Login" func={handleSubmit} />
      </form>
    </div>
  );
};

export default Login;
