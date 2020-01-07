import axios from 'axios'

const apiWeather = process.env.REACT_APP_API_WEATHER
const apiKeyWeather = process.env.REACT_APP_API_API_WEATHER_KEY

class ApiWeather {
    static getCurrentWeather(lat, lng) {
        console.log('getCurrentWeather', lat, lng)
        return axios.get(`${apiWeather}?lat=${-23.6019711}&lon=${-46.8713471}&units=metric&lang=pt&apikey=${apiKeyWeather}`)
    }
}

export default ApiWeather;
