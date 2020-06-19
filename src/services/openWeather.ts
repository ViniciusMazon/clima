import axios from 'axios';

const apiWeather = axios.create({
  baseURL: `http://api.openweathermap.org/`,
});

export default apiWeather;
