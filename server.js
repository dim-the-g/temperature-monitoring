const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Προσθήκη του cors
const app = express();
const port = 3001;

let temperatureData = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());  // Χρήση του cors

app.post('/data', (req, res) => {
    const { temperature } = req.body;
    const timestamp = new Date().toISOString();
    temperatureData.push({ temperature, timestamp });
    console.log(`Received data: ${temperature} °C at ${timestamp}`);
    res.sendStatus(200);
});

app.get('/getTemperatures', (req, res) => {
    res.json(temperatureData);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
