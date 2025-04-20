const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());
const uri = 'mongodb+srv://va285:pass_word123@cluster0.yb05yyx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

let client;
let db;

async function connectToMongo() {
    try {
      client = new MongoClient(uri);
      await client.connect();
      db = client.db('RUHousing');
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
}

connectToMongo();

app.post('/api/submit-preferences', async (req, res) => {
  const { graduation_year, major, duration_of_stay, allergies, sleep_schedule, study_habits, cleanliness, userId } = req.body;

  if (!db) {
    return res.status(500).json({ error: 'Database connection not established.' });
  }

  try {
    const roommatePreferencesCollection = db.collection('roommate_preferences');
    const result = await roommatePreferencesCollection.insertOne({
      userId,
      graduation_year,
      major,
      duration_of_stay,
      allergies,
      sleep_schedule,
      study_habits,
      cleanliness,
    });

    console.log('Preferences stored successfully. Inserted ID:', result.insertedId);
    res.status(200).json({ message: 'Preferences submitted successfully!' });
  } catch (error) {
    console.error('Error storing preferences:', error);
    res.status(500).json({ error: 'Failed to store preferences.' });
  }
});

app.post('/api/matched-profiles', async (req, res) => {
  const userPreferences = req.body;
  const userId = userPreferences.userId;

  if (!db) {
    return res.status(500).json({ error: 'Database connection not established.' });
  }

  try {
    const roommatePreferencesCollection = db.collection('roommate_preferences');
    const allOtherProfiles = await roommatePreferencesCollection.find({ userId: { $ne: userId } }).toArray();
    const matchedProfilesWithScore = [];

    for (const profile of allOtherProfiles) {
      let matchCount = 0;
      if (profile.graduation_year === userPreferences.graduation_year) matchCount++;
      if (profile.major === userPreferences.major) matchCount++;
      if (profile.duration_of_stay === userPreferences.duration_of_stay) matchCount++;
      if (profile.allergies === userPreferences.allergies) matchCount++;
      if (profile.sleep_schedule === userPreferences.sleep_schedule) matchCount++;
      if (profile.study_habits === userPreferences.study_habits) matchCount++;
      if (profile.cleanliness === userPreferences.cleanliness) matchCount++;

      let matchLevel = '';
      if (matchCount >= 5) {
        matchLevel = 'Best Match';
      } else if (matchCount === 4) {
        matchLevel = 'Okay Match';
      } else if (matchCount === 3) {
        matchLevel = 'Good Match';
      } else if (matchCount > 0) {
        matchLevel = 'Potential Match';
      } else {
        matchLevel = 'No Significant Match';
      }

      matchedProfilesWithScore.push({ ...profile, matchCount, matchLevel });
    }

    // Sort by match count in descending order
    matchedProfilesWithScore.sort((a, b) => b.matchCount - a.matchCount);

    res.status(200).json(matchedProfilesWithScore);
  } catch (error) {
    console.error('Error fetching and matching profiles:', error);
    res.status(500).json({ error: 'Failed to fetch and match profiles.' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello from the RUHousing Express server!');
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Try a different one.`);
  } else {
    console.error('Server error:', err);
  }
});
