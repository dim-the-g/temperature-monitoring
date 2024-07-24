document.addEventListener('DOMContentLoaded', (event) => {
    fetchTemperature();
});

function fetchTemperature() {
    fetch('http://localhost:3000/getTemperatures')  // Αυτό είναι το URL του backend
        .then(response => response.json())
        .then(data => {
            let output = "";
            data.forEach(reading => {
                output += `<p>${reading.timestamp}: ${reading.value} °C</p>`;
            });
            document.getElementById('temperature').innerHTML = output;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('temperature').innerHTML = `<p>Error fetching data</p>`;
        });
}