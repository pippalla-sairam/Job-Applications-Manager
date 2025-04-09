const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// Get all
router.get('/', async (req, res) => {
  const applications = await Application.find().sort({ date: -1 });
  res.json(applications);
});

// Add new
router.post('/', async (req, res) => {
  const newApp = new Application(req.body);
  const savedApp = await newApp.save();
  res.json(savedApp);
});

// Update
router.put('/:id', async (req, res) => {
  const updatedApp = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedApp);
});

// Delete
router.delete('/:id', async (req, res) => {
  await Application.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
