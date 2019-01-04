import React, { Component } from 'react';
import '../App.css';
import WeatherCard from '../components/WeatherCard.js'

const PROXY = "https://cors-anywhere.herokuapp.com/"
const API_KEY = "a95f35dc318f97d9e40f2bb8d422c171"
class WeatherContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latitude: "26.092889",
      longitude: "85.948972"
    }
  }

  componentDidMount(){
    fetch(`${PROXY}https://api.darksky.net/forecast/${API_KEY}/${this.state.latitude},${this.state.longitude}`)
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
        console.log(body)
        debugger
        return body
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  render() {
    return (
      <div className="App">
          <WeatherCard/>
      </div>
    );
  }
}

export default WeatherContainer;
