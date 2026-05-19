const express = require('express');
const router = express.Router();
const Itinerary = require('../models/Itinerary');
const { protect } = require('../middleware/authMiddleware');

// SAVE itinerary
router.post('/save', protect, async (req, res) => {
    const { itineraryData, travelStyle } = req.body;

    if (!itineraryData) {
        return res.status(400).json({ error: 'No itinerary data provided' });
    }

    try {
        const saved = await Itinerary.create({
            userId: req.user._id,
            destination: itineraryData.destination,
            duration: itineraryData.duration,
            budget: itineraryData.budget,
            travelStyle: travelStyle || 'balanced',
            itineraryData
        });

        res.status(201).json({ success: true, itinerary: saved });
    } catch (error) {
        console.error('Save error:', error.message);
        res.status(500).json({ error: 'Failed to save itinerary' });
    }
});

// GET all saved itineraries for logged-in user
router.get('/my-itineraries', protect, async (req, res) => {
    try {
        const itineraries = await Itinerary.find({ userId: req.user._id })
            .sort({ createdAt: -1 });
        res.json({ success: true, itineraries });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch itineraries' });
    }
});

// GET single itinerary
router.get('/:id', protect, async (req, res) => {
    try {
        const itinerary = await Itinerary.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!itinerary) {
            return res.status(404).json({ error: 'Itinerary not found' });
        }

        res.json({ success: true, itinerary });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch itinerary' });
    }
});

// DELETE itinerary
router.delete('/:id', protect, async (req, res) => {
    try {
        const itinerary = await Itinerary.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!itinerary) {
            return res.status(404).json({ error: 'Itinerary not found' });
        }

        await Itinerary.deleteOne({ _id: req.params.id });
        res.json({ success: true, message: 'Itinerary deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete itinerary' });
    }
});

// UPDATE itinerary (after re-planning)
router.put('/:id', protect, async (req, res) => {
    const { itineraryData } = req.body;

    try {
        const itinerary = await Itinerary.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!itinerary) {
            return res.status(404).json({ error: 'Itinerary not found' });
        }

        itinerary.itineraryData = itineraryData;
        itinerary.destination = itineraryData.destination;
        itinerary.updatedAt = Date.now();
        await itinerary.save();

        res.json({ success: true, itinerary });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update itinerary' });
    }
});

module.exports = router;