document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    fetchTemperature();
});

function fetchTemperature() {
    console.log('Fetching temperature data...');
    fetch('http://localhost:3001/getTemperatures')  // Αυτό είναι το URL του backend
        .then(response => {
            console.log('Response received:', response);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);
            let output = "";
            data.forEach(reading => {
                output += `<p>${reading.timestamp}: ${reading.temperature} °C</p>`;
            });
            document.getElementById('temperature').innerHTML = output;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('temperature').innerHTML = `<p>Error fetching data</p>`;
        });
}
