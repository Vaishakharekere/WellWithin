const mongoose = require('mongoose');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
// Get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new appointment
const createAppointment = async (req, res) => {
  const { patientId, doctorId, appointmentDate,appointmentTime, reason } = req.body;
  try {

    const appointment = new Appointment({ patientId, doctorId, appointmentDate,appointmentTime, reason });
    const savedAppointment = await appointment.save();
    res.status(201).json(savedAppointment);
  } catch (err) {
    console.log(err.message)
    res.status(400).json({ message: err.message });
  }
};

// Get appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate('patientId').populate('doctorId');
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllAppointments, createAppointment, getAppointmentById };
