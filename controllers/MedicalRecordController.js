const MedicalRecord = require('../models/MedicalRecord');

const getAllRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find()
      .populate('patientId')
      .populate('doctorId');
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createRecord = async (req, res) => {
  const { patientId, doctorId, visitDetails, prescriptions, diagnosis } = req.body;
  try {
    const record = new MedicalRecord({
      patientId,
      doctorId,
      visitDetails,
      prescriptions,
      diagnosis,
    });
    const savedRecord = await record.save();
    res.status(201).json(savedRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getRecordById = async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id)
      .populate('patientId')
      .populate('doctorId');
    if (!record) return res.status(404).json({ message: 'Medical record not found' });
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllRecords, createRecord, getRecordById };