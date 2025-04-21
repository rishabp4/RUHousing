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
      graduation_year: graduation_year ? graduation_year.trim() : '',
      major: major ? major.trim() : '',
      duration_of_stay: duration_of_stay ? duration_of_stay.trim() : '',
      allergies: allergies ? allergies.trim() : '',
      sleep_schedule: sleep_schedule ? sleep_schedule.trim() : '',
      study_habits: study_habits ? study_habits.trim() : '',
      cleanliness: cleanliness ? cleanliness.trim() : '',
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
    const matchedProfilesWithLevel = [];

    const trimmedUserPreferences = {
      graduation_year: userPreferences.graduation_year ? userPreferences.graduation_year.trim() : '',
      major: userPreferences.major ? userPreferences.major.trim() : '',
      duration_of_stay: userPreferences.duration_of_stay ? userPreferences.duration_of_stay.trim() : '',
      allergies: userPreferences.allergies ? userPreferences.allergies.trim() : '',
      sleep_schedule: userPreferences.sleep_schedule ? userPreferences.sleep_schedule.trim() : '',
      study_habits: userPreferences.study_habits ? userPreferences.study_habits.trim() : '',
      cleanliness: userPreferences.cleanliness ? userPreferences.cleanliness.trim() : '',
    };

    for (const profile of allOtherProfiles) {
      const trimmedProfile = {
        ...profile,
        graduation_year: profile.graduation_year ? profile.graduation_year.trim() : '',
        major: profile.major ? profile.major.trim() : '',
        duration_of_stay: profile.duration_of_stay ? profile.duration_of_stay.trim() : '',
        allergies: profile.allergies ? profile.allergies.trim() : '',
        sleep_schedule: profile.sleep_schedule ? profile.sleep_schedule.trim() : '',
        study_habits: profile.study_habits ? profile.study_habits.trim() : '',
        cleanliness: profile.cleanliness ? profile.cleanliness.trim() : '',
      };

      let matchLevel = '';
      let allMatch = true;

      // Check if all attributes match
      if (
        trimmedProfile.graduation_year !== trimmedUserPreferences.graduation_year ||
        trimmedProfile.major !== trimmedUserPreferences.major ||
        trimmedProfile.duration_of_stay !== trimmedUserPreferences.duration_of_stay ||
        trimmedProfile.allergies !== trimmedUserPreferences.allergies ||
        trimmedProfile.sleep_schedule !== trimmedUserPreferences.sleep_schedule ||
        trimmedProfile.study_habits !== trimmedUserPreferences.study_habits ||
        trimmedProfile.cleanliness !== trimmedUserPreferences.cleanliness
      ) {
        allMatch = false;
      }

      if (allMatch) {
        matchLevel = 'Best Match';
      } else if (
        trimmedProfile.duration_of_stay === trimmedUserPreferences.duration_of_stay &&
        trimmedProfile.allergies === trimmedUserPreferences.allergies &&
        trimmedProfile.study_habits === trimmedUserPreferences.study_habits
      ) {
        matchLevel = 'Avg Match';
      } else if (
        trimmedProfile.duration_of_stay === trimmedUserPreferences.duration_of_stay &&
        trimmedProfile.allergies === trimmedUserPreferences.allergies
      ) {
        matchLevel = 'Ok Match';
      }

      if (matchLevel) {
        matchedProfilesWithLevel.push({ ...profile, matchLevel });
      }
    }

    res.status(200).json(matchedProfilesWithLevel);
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
