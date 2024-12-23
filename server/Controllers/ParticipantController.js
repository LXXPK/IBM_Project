const Participant = require('../models/Participant');
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');




exports.checkInParticipant = async (req, res) => {
  const { userId } = req.body;

  try {

    const participant = await Participant.findOne({ userId });

    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }

    if (participant.isCheckedIn) {
      return res.status(400).json({ message: 'Participant already checked-in' });
    }

    participant.isCheckedIn = true;
    await participant.save();

    res.json({ message: 'Check-in successful', participant });
  } catch (err) {
    res.status(500).json({ message: 'Error during check-in', error: err });
  }
};
