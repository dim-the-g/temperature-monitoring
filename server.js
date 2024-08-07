const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3001;

// Σύνδεση με τη βάση δεδομένων MongoDB Atlas
mongoose.connect('mongodb+srv://dimkuritshs:jimkiritsis123@cluster0.ihfid.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Ορισμός σχήματος για τα δεδομένα θερμοκρασίας
const temperatureSchema = new mongoose.Schema({
    temperature: Number,
    timestamp: String
});

const Temperature = mongoose.model('Temperature', temperatureSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post('/data', async (req, res) => {
    const { temperature } = req.body;
    console.log('Received data:', req.body);

    // Εξαγωγή αριθμητικής τιμής από τη συμβολοσειρά
    const tempMatch = temperature.match(/([\d.]+) C/);
    if (!tempMatch) {
        console.error('Invalid temperature value:', temperature);
        return res.status(400).send('Invalid temperature value');
    }
    const numericTemperature = parseFloat(tempMatch[1]);

    const timestamp = new Date().toISOString();
    const newTemperature = new Temperature({
        temperature: numericTemperature,
        timestamp
    });

    try {
        await newTemperature.save();
        console.log(`Data saved: ${numericTemperature} °C at ${timestamp}`);
        res.sendStatus(200);
    } catch (err) {
        console.error('Error saving data:', err);
        res.sendStatus(500);
    }
});


app.get('/getTemperatures', async (req, res) => {
    try {
        const temperatures = await Temperature.find({});
        res.json(temperatures);
    } catch (err) {
        res.sendStatus(500);
        console.error(err);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
