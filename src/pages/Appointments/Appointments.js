import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Appointments.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const {role} = useAuth();
  const isUpcoming = (appointmentDate) => {
    const currentDate = new Date();
    const appointmentDateObj = new Date(appointmentDate);
    return appointmentDateObj > currentDate;
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/appointments')
      .then(response => {
        console.log(response)
        const upcomingAppointments = response.data.filter((appointment) => 
          isUpcoming(appointment.appointmentDate)
        );
        setAppointments(upcomingAppointments);
      })
      .catch(error => {
        console.error('Error fetching appointments!', error);
      });
  }, []);

  return (
    <div className="upcoming-appointments">
      <h1>Upcoming Appointments</h1>
      {appointments.length === 0 ? (
        <p align='center'>No upcoming appointments.</p>
      ) : (
        <div className="appointments-list">
          {appointments.map((appointment, index) => (
            <div key={index} className="appointment-item">
              <div className="appointment-header">
                <h2>{appointment.doctorId}</h2>
                <p>{appointment.appointmentDate}</p>
              </div>
              <div className="appointment-details">
                <p><strong>Reason:</strong> {appointment.reason}</p>
                <p><strong>Status:</strong> {appointment.status}</p>
                <p><strong>Notes:</strong> {appointment.notes}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {role === '"patient"' && <div className="add" onClick={()=>navigate('/appointment-form')}>
        Book Appointment
      </div>}
    </div>
  );
};

export default Appointment;
