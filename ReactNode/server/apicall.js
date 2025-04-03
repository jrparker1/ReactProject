import axios from 'axios';
import https from 'https';


class WeatherData {
    constructor(location) {
        this._location = location;
        this._accessKey = '12b3d08c2b0dd12ae2ea7b88149b6f8c'; 
        this.data = null;
        this._temperature = null
        this._sunrise = null;
        this._sunset = null;
        this._moonrise = null;
        this._moonset = null;
        this._moonphase = null;
        this._moonillumination = null;
        this._airquality_co = null;
        this._airquality_no2 = null;
        this._airquality_o3 = null;
        this._airquality_so2 = null;
        this._airquality_pm2_5 = null;
        this._airquality_pm10 = null;

        // Make the API call
        this.fetchWeatherData();
    }

    // Define properties Getter and Setter
    // #region Properties
    get Temperature() { return this._temperature;}
    set Temperature(data) { this._temperature = data.temperature; }

    get Sunrise() { return this._sunrise;}
    set Sunrise(data) { this._sunrise = data.astro.sunrise;}

    get Sunset() { return this._sunset; }
    set Sunset(data) { this._sunset = data.astro.sunset; }

    get Moonrise() { return this._moonrise; }
    set Moonrise(data) { this._moonrise = data.astro.moonrise;}

    get Moonset() { return this._moonset; }
    set Moonset(data) { this._moonset = data.astro.moonset;}

    get Moonphase() { return this._moonphase; }
    set Moonphase(data) { this._moonphase = data.astro.moon_phase; }

    get Moonillumination() { return this._moonillumination; }
    set Moonillumination(data) { this._moonillumination = data.astro.moon_illumination; }

    get AirQuality_CO() { return this._airquality_co; }
    set AirQuality_CO(data) { this._airquality_co = data.air_quality.co; }

    get AirQuality_NO2() { return this._airquality_no2; }
    set AirQuality_NO2(data) { this._airquality_no2 = data.air_quality.no2; }

    get AirQuality_O3() { return this._airquality_o3; }
    set AirQuality_O3(data) { this._airquality_o3 = data.air_quality.o3; }

    get AirQuality_SO2() { return this._airquality_so2; }
    set AirQuality_SO2(data) { this._airquality_so2 = data.air_quality.so2; }

    get AirQuality_PM2_5() { return this._airquality_pm2_5; }
    set AirQuality_PM2_5(data) { this._airquality_pm2_5 = data.air_quality.pm2_5; }

    get AirQuality_PM10() { return this._airquality_pm10; }
    set AirQuality_PM10(data) { this._airquality_pm10 = data.air_quality.pm10; }
    // #endregion

    // #region methods 

    CelsiusToFahrenheit(celsius) { return (celsius * 9 / 5) + 32;}

    FahrenheitToCelsius(fahrenheit) { return (fahrenheit - 32) * 5 / 9; }

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
            this.Temperature = data;
            this.Sunrise = data;
            this.Sunset = data;
            this.Moonrise = data;
            this.Moonset = data;
            this.Moonphase = data;
            this.Moonillumination = data;

            this.AirQuality_CO = data;
            this.AirQuality_NO2 = data;
            this.AirQuality_O3 = data;
            this.AirQuality_SO2 = data;
            this.AirQuality_PM2_5 = data;
            this.AirQuality_PM10 = data;

            this.WindSpeed = data;
            this.WindDegree = data;
            this.WindDir = data;
            this.Pressure = data;
            this.Precip = data;
            this.Humidity = data;
            this.CloudCover = data;
            this.FeelsLike = data;
            this.UVIndex = data;
            this.Visibility = data;
            this.IsDay = data;


            // Log the weather data
             console.log('Weather Data:', data);
             console.log('Temperature:', data.temperature);
             console.log('Weather Description:', data.weather_descriptions[0]); // Example: "Partly Cloudy"
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    // #endregion
}

const weather = new WeatherData('Orlando');
setTimeout(() => {
     console.log('Temperature after API call:', weather.Temperature);
     console.log('Sunrise after API call:', weather.Sunrise);
     console.log('Sunset after API call:', weather.Sunset);
     console.log('Moonrise after API call:', weather.Moonrise);
     console.log('Moonset after API call:', weather.Moonset);
     console.log('Moonphase after API call:', weather.Moonphase);
     console.log('Moonillumination after API call:', weather.Moonillumination);
     console.log('AirQuality_CO after API call:', weather.AirQuality_CO);
     console.log('AirQuality_NO2 after API call:', weather.AirQuality_NO2);
     console.log('AirQuality_O3 after API call:', weather.AirQuality_O3);
     console.log('AirQuality_SO2 after API call:', weather.AirQuality_SO2);
     console.log('AirQuality_PM2_5 after API call:', weather.AirQuality_PM2_5);
     console.log('AirQuality_PM10 after API call:', weather.AirQuality_PM10);
}, 30000);
