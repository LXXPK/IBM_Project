const Participant = require('../models/Participant');
const mongoose = require('mongoose');


exports.checkIn = async (req, res) => {
  const { userId } = req.body; 

  try {
   
    const userObjectId = mongoose.Types.ObjectId(userId);
    console.log(userObjectId);

   
    const participant = await Participant.findOne({ userId: userObjectId });

    if (!participant) {
      return res.status(404).json({ message: "Participant not registered for any event" });
    }

    if (participant.isCheckedIn) {
      return res.status(400).json({ message: "Participant already checked in" });
    }

    participant.isCheckedIn = true;
    await participant.save();

    res.json({ message: "Check-in successful", participant });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid userId format" });
    }
    res.status(500).json({ message: "Error during check-in", error: err.message });
  }
};
