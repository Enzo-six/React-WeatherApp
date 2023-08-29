import "./App.css";
import Search from "./components/Search";
import CurrentWeather from "./components/current-weather/Current-weather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./API";
import { useState } from "react";
import Forecast from "./components/forecast/forecast";
import logo from './logo.png'
import Header from "./components/Header/Header";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  console.log(currentWeather);
  console.log(forecast);
  

  return (
    <div className="container">
      <Header>
      <img src={logo} alt='La maison jungle' className='lmj-logo' />
				<h1 className='lmj-title'>Météo en temps réel</h1>
      </Header>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
