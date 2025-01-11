const express = require('express');
const { getAllAppointments, createAppointment, getAppointmentById } = require('../controllers/AppointmentController');
const router = express.Router();

router.get('/', getAllAppointments);
router.post('/', createAppointment);
router.get('/:id', getAppointmentById);

module.exports = router;
