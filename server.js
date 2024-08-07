const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3001;

// Σύνδεση με τη βάση δεδομένων MongoDB Atlas
mongoose.connect('mongodb+srv://dimkuritshs:jimkiritsis123@cluster0.ihfid.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

// Ορισμός σχήματος για τα δεδομένα θερμοκρασίας
const temperatureSchema = new mongoose.Schema({
    temperature: Number,
    timestamp: String
});

const Temperature = mongoose.model('Temperature', temperatureSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post('/data', (req, res) => {
    const { temperature } = req.body;
    const timestamp = new Date().toISOString();

    const newTemperature = new Temperature({
        temperature,
        timestamp
    });

    newTemperature.save(err => {
        if (err) {
            res.sendStatus(500);
            console.error(err);
        } else {
            console.log(`Received data: ${temperature} °C at ${timestamp}`);
            res.sendStatus(200);
        }
    });
});

app.get('/getTemperatures', (req, res) => {
    Temperature.find({}, (err, temperatures) => {
        if (err) {
            res.sendStatus(500);
            console.error(err);
        } else {
            res.json(temperatures);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
