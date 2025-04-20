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

app.get('/api/matches/:userId', async (req, res) => {
  const userId = req.params.userId;

  if (!db) {
    return res.status(500).json({ error: 'Database connection not established.' });
  }

  try {
    const roommatePreferencesCollection = db.collection('roommate_preferences');
    const currentUserPreferences = await roommatePreferencesCollection.findOne({ userId });

    if (!currentUserPreferences) {
      return res.status(404).json({ message: 'User preferences not found.' });
    }

    const allOtherPreferences = await roommatePreferencesCollection.find({ userId: { $ne: userId } }).toArray();

    const matches = allOtherPreferences.filter(other => (
      other.duration_of_stay === currentUserPreferences.duration_of_stay &&
      other.sleep_schedule === currentUserPreferences.sleep_schedule &&
      other.study_habits === currentUserPreferences.study_habits &&
      other.cleanliness === currentUserPreferences.cleanliness
    ));

    res.status(200).json(matches.map(match => match.userId));
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Failed to fetch matches.' });
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