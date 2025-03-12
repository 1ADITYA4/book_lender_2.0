const express = require('express');
const MentorshipSession = require('../models/MentorshipSession');
const router = express.Router();

// Route to create a new mentorship session
router.post('/', async (req, res) => {
    const { title, description, mentorId, menteeId } = req.body;
    try {
        const session = new MentorshipSession({ title, description, mentorId, menteeId });
        await session.save();
        res.status(201).json({ message: 'Mentorship session created successfully', session });
    } catch (error) {
        res.status(500).json({ message: 'Error creating mentorship session', error: error.message });
    }
});

// Route to fetch all mentorship sessions
router.get('/', async (req, res) => {
    try {
        const sessions = await MentorshipSession.find();
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching mentorship sessions', error: error.message });
    }
});

module.exports = router;
