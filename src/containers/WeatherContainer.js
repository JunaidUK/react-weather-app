import React, { Component } from 'react';
import '../weathercontainer.css';
import WeatherCard from '../components/WeatherCard.js'

const PROXY = "https://cors-anywhere.herokuapp.com/"
const API_KEY = ""

class WeatherContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latitude: "26.092889",
      longitude: "85.948972",
      current_weather: {},
      daily_weather: {
        data: []
      }
    }
  }

  componentDidMount(){
    fetch(`${PROXY}https://api.darksky.net/forecast/${API_KEY}/${this.state.latitude},${this.state.longitude}?exclude=[minutely,hourly]`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({current_weather: body.currently, daily_weather: body.daily})
        return body
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  render() {
    let dailyWeatherCards = this.state.daily_weather.data.map((dayWeather)=>{
      return(
        <li>
          <div className="col s12 l6">
            <WeatherCard
              temp={dayWeather.temperatureHigh}
              visibility={dayWeather.visibility}
              summary={dayWeather.summary}
              icon = {dayWeather.icon}
              />
          </div>
        </li>
      )
    })
    return (
      <div className="container">
        <div className="row">
          <h4> TODAY</h4>
          <div className="col s12 m12 l12">
            <WeatherCard id="current-weather"
              temp={this.state.current_weather.temperature}
              visibility={this.state.current_weather.visibility}
              summary={this.state.current_weather.summary}
              icon = {this.state.current_weather.icon}
              />
          </div>
          <div id="daily-weather-cards">
          <h4>NEXT WEEK</h4>
          <ul>
            {dailyWeatherCards}
          </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherContainer;
