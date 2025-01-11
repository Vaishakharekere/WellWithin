import axios from 'axios';
import React, { useState } from 'react';
import './Signup.css';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    role: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    imageFile: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setFormData((prevData) => ({
          ...prevData,
          imageFile: file,
        }));
      };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
  
    axios
      .post('http://localhost:5000/api/users', formData)
      .then((response) => {
        console.log('Form submitted successfully:', response);
        setSuccess(true);
        setFormData({
          name: '',
          username: '',
          email: '',
          password: '',
          role: '',
          phone: '',
          address: '',
          dateOfBirth: '',
          gender: '',
          imageFile: '',
        });
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Error: ' + error.response?.data?.message || 'Something went wrong.');
      });
  };
  

  return (
    <div className="signup">
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit} className="signup-form">
        {/* Display error if exists */}
        {error && <div className="error-message">{error}</div>}

        {/* Display success message after successful submission */}
        {success && <div className="success-message">Signup successful!</div>}

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your Name"
            required
          />
        </div>

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
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
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

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="" disabled></option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            rows="5"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <label htmlFor="imageFilw">Profile Image</label>
          <input
            style={{ border: 'none' }}
            type="file"
            id="imageFile"
            name="imageFile"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <Button content="Sign Up" func={handleSubmit} />
      </form>
    </div>
  );
};

export default Signup;
