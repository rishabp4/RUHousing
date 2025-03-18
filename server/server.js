const express = require('express');
 const cors = require('cors');
 
 const app = express();
 app.use(cors());           // Enable CORS
 app.use(express.json());   // Parse JSON bodies
 
 // Simple test route
 app.get('/', (req, res) => {
   res.send('Hello from the RUHousing Express server!');
 });
 
 // Start server on port 5000
 const PORT = process.env.PORT || 5001;
 app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
 });
