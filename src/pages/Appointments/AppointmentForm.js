import React, { useState, useEffect } from 'react';
import './AppointmentForm.css';
import axios from 'axios';
import { useAuth } from '../../context/authContext';

const AppointmentForm = () => {
  const { uid } = useAuth();
  const [formData, setFormData] = useState({
    patientId: uid,
    doctorId: '', // Correct field name
    reason: '',
    appointmentDate: '', // Correct the name to match input field
    appointmentTime: '',
  });
  
  const [doctors, setDoctors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setDoctors(response.data.filter(user => user.role === 'doctor'));
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/appointments', formData);
      if (response.status === 201) {
        setSuccessMessage('Appointment added successfully!');
        setFormData({
          patientId: uid,
          doctorId: '',
          appointmentDate: '',
          appointmentTime: '',
          reason: '',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to add appointment.');
    }
  };

  return (
    <div className="appointment-form-container">
      <h2>Add Appointment</h2>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="reason">Reason</label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Enter Reason"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="appointmentDate">Date</label>
          <input
            type="date"
            id="appointmentDate"
            name="appointmentDate" // Corrected name
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="appointmentTime">Time</label>
          <input
            type="time"
            id="appointmentTime"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="doctorId">Doctor</label> {/* Corrected ID */}
          <select
            id="doctorId"
            name="doctorId" 
            value={formData.doctorId} // Bind the value to doctorId
            onChange={handleChange}
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-button">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
