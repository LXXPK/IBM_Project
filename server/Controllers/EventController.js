const jwt = require('jsonwebtoken');
const Event = require('../models/Event');
const Participant = require('../models/Participant');

const QRCode = require('qrcode'); // For generating QR codes
const path = require('path');
const fs = require('fs');

// Middleware to verify token and role (Admin only for event creation)
const verifyAdmin = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Extract token from header

  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { // Use JWT secret from .env
    if (err) return res.status(403).json({ message: 'Unauthorized' });
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
    req.userId = decoded.id; // Store userId in request
    next();
  });
};

// Get UserId from JWT Token
const getUserIdFromToken = (req) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Extract token from header
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use JWT secret from .env
    return decoded.id; // Return userId from decoded token
  } catch (error) {
    return null; // Return null if the token is invalid
  }
};

// Create Event (Admin only)
exports.createEvent = async (req, res) => {
  const { name, description, date } = req.body;

  try {
    const event = new Event({ name, description, date });
    await event.save();
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (err) {
    res.status(500).json({ message: 'Error creating event', error: err });
  }
};

// List Events (No auth required)
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching events', error: err });
  }
};


exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting event', error: err });
  }
};

exports.registerForEvent = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; 
  if (!token) return res.status(403).json({ message: 'Unauthorized, token missing.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    const { eventId } = req.body; 
    const userId = decoded.id; 

    if (!eventId) {
      return res.status(400).json({ message: 'EventId is required.' });
    }

    
    const existingParticipant = await Participant.findOne({ userId, eventId });
    if (existingParticipant) {
      return res.status(200).json({ message: 'You are already registered for this event.' }); 
    }

    const qrCodeData = `${userId}`;
    const qrCodePath = path.join(__dirname, '..', 'uploads', `qr_${userId}_${eventId}.png`);
    await QRCode.toFile(qrCodePath, qrCodeData);

  
    const userImagePath = path.join(__dirname, '..', 'uploads', `user_${userId}.png`);

    const participant = new Participant({
      userId,
      eventId,
      qrCode: qrCodePath,
      image: userImagePath,
    });
    await participant.save();

    res.status(201).json({ message: 'Registration successful', qrCode: qrCodePath });
  } catch (err) {
    res.status(500).json({ message: 'Error registering for event', error: err.message });
  }
};

exports.getRegisteredEvents = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; 
  if (!token) return res.status(403).json({ message: 'Unauthorized, token missing.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    const userId = decoded.id; 
    const participants = await Participant.find({ userId }).populate('eventId');
    if (!participants.length) {
      return res.status(200).json({ message: 'No registered events found.' });
    }

    const events = participants.map((participant) => ({
      eventName: participant.eventId.name,
      eventDescription: participant.eventId.description,
      eventDate: participant.eventId.date,
      qrCode: `/uploads/${path.basename(participant.qrCode)}`, 
      image: `/uploads/${path.basename(participant.qrCode)}`, 
    }));

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching registered events', error: err.message });
  }
};
