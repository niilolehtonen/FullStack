import axios from 'axios'

const getWeather= (capital) => {
    console.log(capital)
    const api_key = import.meta.env.VITE_API_KEY
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
    return request.then(response => response.data)
}

export default getWeather