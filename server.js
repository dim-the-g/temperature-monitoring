const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Δημιουργία της εφαρμογής Express
const app = express();
const port = 3001;

// Ρύθμιση του Mongoose για τη σύνδεση στη βάση δεδομένων MongoDB
mongoose.connect('mongodb://localhost/temperature_monitoring', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Δημιουργία του Schema και του Model για την αποθήκευση θερμοκρασίας
const temperatureSchema = new mongoose.Schema({
  temperature: Number,
  timestamp: String
});

const Temperature = mongoose.model('Temperature', temperatureSchema);

// Ρύθμιση του body-parser και του CORS
app.use(bodyParser.json());
app.use(cors());

// Δημιουργία του route για την αποστολή δεδομένων
app.post('/data', async (req, res) => {
  const { temperature } = req.body;

  // Ελέγξτε αν η θερμοκρασία είναι αριθμός
  const numericTemperature = parseFloat(temperature);

  if (isNaN(numericTemperature)) {
    console.error('Invalid temperature value:', temperature);
    return res.status(400).send('Invalid temperature value');
  }

  const timestamp = new Date().toISOString();

  const newTemperature = new Temperature({
    temperature: numericTemperature,
    timestamp
  });

  try {
    await newTemperature.save();
    console.log(`Received data: ${numericTemperature} °C at ${timestamp}`);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
});

// Προσθήκη route για την αρχική σελίδα
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Εκκίνηση του server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
