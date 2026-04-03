require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route for Testing
app.get('/', (req, res) => {
  res.send('Train Booking API is running...');
});

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Database Connection Placeholder
/*
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
*/

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
