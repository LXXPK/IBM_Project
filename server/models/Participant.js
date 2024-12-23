const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User', required: true }, 
  name: String,
  email: String,
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }, 
  qrCode: String, 
  image: String, 
  isCheckedIn: { type: Boolean, default: false },
});

module.exports = mongoose.model('Participant', participantSchema);
