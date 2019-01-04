import React from 'react'
import ReactAnimatedWeather from 'react-animated-weather'

const DEFAULTS = {
  color: 'goldenrod',
  size: 128,
  animate: true
};

const setIcon = (weather) => {
  if (weather != undefined) {
    switch(weather){
      case "clear-night":
        return "CLEAR_NIGHT"
      case "clear-day":
        return "CLEAR_DAY"
      case "partly-cloudy-night":
        return "PARTLY_CLOUDY_NIGHT"
      case "partly-cloudy-day":
        return "PARTLY_CLOUDY_DAY"
      default:
        return weather.toUpperCase()
    }
  }
}

const WeatherCard = (props) => {
  let iconType = setIcon(props.icon)

  return (
    <div>
      <ReactAnimatedWeather className="weather-icon"
        icon={iconType}
        color={DEFAULTS.color}
        size ={DEFAULTS.size}
        animate={DEFAULTS.animate}
      />
      <p>{props.temp}</p>
      <p>{props.summary}</p>
      <p>{props.visibility}</p>
    </div>
  )

}


export default WeatherCard
