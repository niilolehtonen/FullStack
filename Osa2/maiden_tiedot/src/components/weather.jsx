import { useState, useEffect } from 'react'
import getWeather from '../services/weatherService'

const Weather = ({country}) => {
    
    const [info, setInfo] = useState(null)
    console.log('in weather', country)
    console.log('country.capital[0]:', country.capital[0]);
    useEffect(() => {
        getWeather(country.capital[0])
        .then(newInfo => {
            setInfo(newInfo)
            console.log(newInfo)
        })
    }, [])

    if (!info){
        return null
    }

    const image = 'http://openweathermap.org/img/w/'+info.weather[0].icon+'.png'
    return(
        <div>
            <h2>Weather in {country.capital}</h2>
            <p>temperature {info.main.temp} Celsius</p>
            <img src={image} width={100}/>
            <p>wind {info.wind.speed} m/s</p>
        </div>
    )
}


export default Weather