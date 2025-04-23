const express = require('express');
const router = express.Router();
const User = require('./models/User');

// Create or update a profile
router.post('/', async (req, res) => {
  const { uid, email, firstName, lastName } = req.body;

  try {
    let user = await User.findOne({ uid });

    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      await user.save();
      return res.json({ message: '✅ Profile updated', user });
    }

    user = new User({ uid, email, firstName, lastName });
    await user.save();
    res.json({ message: '✅ Profile created', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '❌ Server error' });
  }
});

// Fetch profile by UID
router.get('/', async (req, res) => {
  const { uid } = req.query;

  try {
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: '❌ Server error' });
  }
});

module.exports = router;
