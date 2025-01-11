const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: { type: String, ref: 'User', required: true },
  doctorId: { type: String, ref: 'User', required: true },
  appointmentDate: { type: Date, required: true },
  appointmentTime: {type: String, required: true},
  reason: { type: String },
  status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' },
  createdAt: { type: Date, default: Date.now }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
