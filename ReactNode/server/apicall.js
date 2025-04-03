import axios from 'axios';
import https from 'https';


class WeatherData {
    constructor(location) {
        this._location = location; // Instance variable to hold location
        this._accessKey = 'key'; // Instance variable to hold the access key
        this._temperature = null; // Initialize temperature to null

        // Make the API call
        this.fetchWeatherData();
    }

    // Getter for temperature
    get temperature() {
        return this._temperature; // Return the _temperature value
    }

    // Setter for temperature
    set temperature(data) {
        this._temperature = data.temperature; // Set temperature value from API response
    }


    celsiusToFahrenheit(celsius) {
        return (celsius * 9 / 5) + 32;
    }

    fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

    // Options for the API request
    get options() {
        return {
            method: 'GET',
            url: 'https://api.weatherstack.com/current',
            params: {
                access_key: this._accessKey, // Use this._accessKey instead of accessKey
                query: this._location, // Use this._location
            },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        };
    }

    // Async function to make the API request and handle the data
    async fetchWeatherData() {
        try {
            const response = await axios.request(this.options); // Make the API request using this.options
            const data = response.data.current; // Access the current data from the response

            // Set the temperature using the setter
            this.temperature = data;

            // Log the weather data
            // console.log('Weather Data:', data);
            // console.log('Temperature:', data.temperature);
            // console.log('Weather Description:', data.weather_descriptions[0]); // Example: "Partly Cloudy"
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }
}

const weather = new WeatherData('Orlando');
setTimeout(() => {
    console.log('Temperature after API call:', weather.celsiusToFahrenheit(weather.temperature));
}, 200);
