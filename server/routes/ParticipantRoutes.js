const express = require('express');
const router = express.Router();
const {  checkInParticipant  } = require('../Controllers/ParticipantController');

router.post('/checkin', checkInParticipant);



module.exports = router;
