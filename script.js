document.addEventListener("DOMContentLoaded", function() {
    function fetchTemperature() {
        fetch('http://localhost:3002/temperature')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                document.getElementById('temperature').innerText = `Temperature: ${data.temperature} °C`;
                document.getElementById('timestamp').innerText = `Timestamp: ${data.timestamp}`;
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                document.getElementById('temperature').innerText = 'Error fetching data';
                document.getElementById('timestamp').innerText = '';
            });
    }

    // Fetch temperature every 10 seconds
    setInterval(fetchTemperature, 10000);
    fetchTemperature();  // Initial fetch
});