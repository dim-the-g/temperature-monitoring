const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3002;

// Σύνδεση με MongoDB
const uri = 'mongodb+srv://dimkuritshs:jimkiritsis123@cluster0.ihfid.mongodb.net/temperatureDB?retryWrites=true&w=majority';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Ορισμός του schema για την αποθήκευση των δεδομένων θερμοκρασίας
const temperatureSchema = new mongoose.Schema({
    temperature: {
        type: Number,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    },
});

const Temperature = mongoose.model('Temperature', temperatureSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Διαχείριση POST αιτήσεων για αποθήκευση θερμοκρασίας
app.post('/data', async (req, res) => {
    const { temperature } = req.body;
    const timestamp = new Date().toISOString();

    if (typeof temperature !== 'number') {
        return res.status(400).json({ error: 'Invalid temperature value' });
    }

    const newTemperature = new Temperature({
        temperature,
        timestamp,
    });

    try {
        // Αποθήκευση της εγγραφής στη βάση δεδομένων
        await newTemperature.save();
        console.log(`Received data: ${temperature} °C at ${timestamp}`);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error saving temperature data:', error);
        res.status(500).json({ error: 'Error saving temperature data' }); // Βελτίωση σφάλματος
    }
});

// Διαχείριση GET αιτήσεων για λήψη θερμοκρασιών
app.get('/getTemperatures', async (req, res) => {
    console.log('GET request received for /getTemperatures');
    try {
        const temperatures = await Temperature.find();
        console.log('Temperatures retrieved:', temperatures);
        res.json(temperatures);
    } catch (error) {
        console.error('Error retrieving temperature data:', error);
        res.status(500).json({ error: 'Error retrieving temperature data' });
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
