import axios from 'axios';
import https from 'https';

const accessKey = ''; // Replace with your actual access key
const location = "Orlando";
const options = {
    method: 'GET',
    url: 'https://api.weatherstack.com/current',
    params: {
        access_key: accessKey,
        query: location,
    },
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
};

try {
    const response = axios.request(options);
    response.then((res) => {
        console.log(res.data);
    });
} catch (error) {
    console.error(error);
}