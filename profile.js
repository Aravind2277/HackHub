const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Organizer = require('../models/Organizer');
const Participant = require('../models/Participant');
const Judge = require('../models/Judge');

// Get user profile
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.render('error', { message: 'User not found' });
        }

        let roleSpecificData;
        let stats = {};

        switch (req.user.role) {
            case 'organizer':
                roleSpecificData = await Organizer.findOne({ user: user._id });
                stats = {
                    totalHackathons: 0, // You can add actual stats calculation here
                    totalParticipants: 0,
                    averageRating: 'N/A'
                };
                break;
            case 'participant':
                roleSpecificData = await Participant.findOne({ user: user._id });
                stats = {
                    hackathonsJoined: 0,
                    projectsSubmitted: 0,
                    achievementsEarned: 0
                };
                break;
            case 'judge':
                roleSpecificData = await Judge.findOne({ user: user._id });
                stats = {
                    hackathonsJudged: 0,
                    reviewsGiven: 0,
                    averageRating: 'N/A'
                };
                break;
        }

        return res.render('dashboard/profile', {
            layout: 'dashboard/layout',
            user,
            [req.user.role]: roleSpecificData,
            stats,
            path: 'profile',
            title: 'Profile'
        });
    } catch (error) {
        console.error('Profile error:', error);
        return res.render('error', { 
            message: 'Error loading profile',
            path: 'error'
        });
    }
});

// Update profile
router.post('/update', auth, async (req, res) => {
    try {
        const updates = req.body;
        console.log('Received updates:', updates); // Debug log

        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        // Update user fields
        if (updates.firstName) user.firstName = updates.firstName;
        if (updates.lastName) user.lastName = updates.lastName;
        if (updates.email) user.email = updates.email;
        await user.save();

        // Update role-specific fields
        switch (req.user.role) {
            case 'organizer':
                const organizerUpdate = {
                    phone: updates.phone,
                    organization: updates.organization,
                    bio: updates.bio,
                    website: updates.website,
                    socialLinks: {
                        linkedin: updates.linkedin || '',
                        twitter: updates.twitter || '',
                        github: updates.github || ''
                    }
                };

                // If location fields are present
                if (updates.city || updates.country) {
                    organizerUpdate.location = {
                        city: updates.city || '',
                        country: updates.country || ''
                    };
                }

                console.log('Organizer update:', organizerUpdate); // Debug log

                const updatedOrganizer = await Organizer.findOneAndUpdate(
                    { user: user._id },
                    organizerUpdate,
                    { new: true, runValidators: true }
                );

                if (!updatedOrganizer) {
                    return res.status(404).json({
                        success: false,
                        message: 'Organizer profile not found'
                    });
                }

                console.log('Updated organizer:', updatedOrganizer); // Debug log
                break;
            // Add cases for participant and judge if needed
        }

        res.status(200).json({ 
            success: true, 
            message: 'Profile updated successfully' 
        });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message || 'Error updating profile' 
        });
    }
});

// Reset organizer profile
router.post('/reset', auth, async (req, res) => {
    try {
        if (req.user.role !== 'organizer') {
            return res.status(403).json({
                success: false,
                message: 'Only organizers can reset their profile'
            });
        }

        // Delete existing organizer profile
        await Organizer.findOneAndDelete({ user: req.user.userId });

        // Create new organizer profile with default values
        const newOrganizer = new Organizer({
            user: req.user.userId,
            organization: 'My Organization', // Default value
            phone: '',
            bio: '',
            website: '',
            socialLinks: {
                linkedin: '',
                twitter: '',
                github: ''
            },
            verificationStatus: 'pending',
            organizationType: 'other',
            location: {
                city: '',
                country: ''
            }
        });

        await newOrganizer.save();

        res.status(200).json({
            success: true,
            message: 'Profile reset successfully'
        });
    } catch (error) {
        console.error('Profile reset error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error resetting profile'
        });
    }
});

module.exports = router; 