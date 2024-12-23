const express = require('express');
const router = express.Router();
const { createEvent, getEvents, registerForEvent, deleteEvent, getRegisteredEvents } = require('../Controllers/EventController');

router.post('/create', createEvent);

router.get('/', getEvents);


router.post('/register', registerForEvent);

router.delete('/delete/:id', deleteEvent);


router.get('/registered', getRegisteredEvents);

module.exports = router;
