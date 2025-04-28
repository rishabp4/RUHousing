router.post('/', async (req, res) => {
    const { uid, email, firstName, lastName, netID, photoURL } = req.body;
  
    if (!uid || !email) {
      return res.status(400).json({ error: 'Missing UID or email' });
    }
  
    try {
      const db = client.db('RUHousing');
      const usersCollection = db.collection('users');
  
      const existingUser = await usersCollection.findOne({ uid });
  
      if (existingUser) {
        await usersCollection.updateOne(
          { uid },
          { $set: { firstName, lastName, netID, photoURL, email } }
        );
        return res.json({ message: '✅ Profile updated' });
      }
  
      await usersCollection.insertOne({ uid, email, firstName, lastName, netID, photoURL });
      res.json({ message: '✅ Profile created' });
    } catch (err) {
      console.error('❌ Error saving profile:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  router.get('/', async (req, res) => {
    const { uid } = req.query;
  
    if (!uid) return res.status(400).json({ error: 'UID is required' });
  
    try {
      const db = client.db('RUHousing');
      const usersCollection = db.collection('users');
  
      const user = await usersCollection.findOne({ uid });
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      res.json(user);
    } catch (err) {
      console.error('❌ Error fetching profile:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  