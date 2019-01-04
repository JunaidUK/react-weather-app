import React, { Component } from 'react';
import '../App.css';
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
      daily_weather: {}
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
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  render() {
    debugger
    return (
      <div className="App">
          <WeatherCard id="current-weather"
            temp={this.state.current_weather.temperature}
            visibility={this.state.current_weather.visibility}
            summary={this.state.current_weather.summary}
            icon = {this.state.current_weather.icon}
          />
      </div>
    );
  }
}

export default WeatherContainer;
