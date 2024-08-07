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
    const timestamp = new Date().toISOString();

    const newTemperature = new Temperature({
        temperature,
        timestamp
    });

    try {
        await newTemperature.save();
        console.log(`Received data: ${temperature} °C at ${timestamp}`);
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(500);
        console.error(err);
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
