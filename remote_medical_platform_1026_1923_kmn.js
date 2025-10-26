// 代码生成时间: 2025-10-26 19:23:51
 * It includes functionalities such as patient registration, doctor appointment booking, and medical consultation.
 */

// Import necessary modules and dependencies
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/remote_medical_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Patient and Doctor schemas
const PatientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  medical_history: [String],
  appointments: [String],
});

const DoctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  available_hours:[String],
  consultations: [String],
});

// Create Patient and Doctor models
const Patient = mongoose.model('Patient', PatientSchema);
const Doctor = mongoose.model('Doctor', DoctorSchema);

// Endpoints
/**
 * Register a new patient
 * @param {string} name - patient's name
 * @param {number} age - patient's age
 * @param {string} gender - patient's gender
 * @param {string[]} medical_history - patient's medical history
 */
app.post('/register_patient', async (req, res) => {
  try {
    const { name, age, gender, medical_history } = req.body;
    if (!name || !age || !gender) {
      return res.status(400).json({ error: 'Missing required patient information' });
    }
    const newPatient = new Patient({ name, age, gender, medical_history });
    await newPatient.save();
    res.status(201).json({ message: 'Patient registered successfully', patient: newPatient });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register patient' });
  }
});

/**
 * Book an appointment with a doctor
 * @param {string} patientId - patient's ID
 * @param {string} doctorId - doctor's ID
 */
app.post('/book_appointment', async (req, res) => {
  try {
    const { patientId, doctorId } = req.body;
    const patient = await Patient.findById(patientId);
    const doctor = await Doctor.findById(doctorId);
    if (!patient || !doctor) {
      return res.status(404).json({ error: 'Patient or doctor not found' });
    }
    patient.appointments.push(doctorId);
    doctor.available_hours.push('2023-10-10 10:00'); // Example appointment time
    await patient.save();
    await doctor.save();
    res.status(201).json({ message: 'Appointment booked successfully', appointment: { patientId, doctorId } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to book appointment' });
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Remote Medical Platform running on port ${PORT}`);
});