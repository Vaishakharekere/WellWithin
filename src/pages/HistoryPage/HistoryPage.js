import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HistoryPage.css';

const HistoryPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('/api/appointments')
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the appointments!', error);
      });
  }, []);

  return (
    <div className="history-page">
      <h1>Previous Appointments</h1>
      {appointments.length === 0 ? (
        <p>No previous appointments found.</p>
      ) : (
        <div className="appointments-list">
          {appointments.map((appointment, index) => (
            <div key={index} className="appointment-item">
              <div className="appointment-header">
                <h2>{appointment.doctorName}</h2>
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
    </div>
  );
};

export default HistoryPage;
