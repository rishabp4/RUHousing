const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());           // Enable CORS
app.use(express.json());   // Parse JSON bodies


app.get('/', (req, res) => {
res.send('Hello from the RUHousing Express server!');


});
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});