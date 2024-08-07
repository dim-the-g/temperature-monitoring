app.post('/data', async (req, res) => {
    const { temperature } = req.body;
    console.log('Received data:', req.body);
  
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
      console.log(`Data saved: ${numericTemperature} °C at ${timestamp}`);
      res.sendStatus(200);
    } catch (err) {
      console.error('Error saving data:', err);
      res.sendStatus(500);
    }
  });
  