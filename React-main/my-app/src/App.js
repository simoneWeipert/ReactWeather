import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';



function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      //console.log("Latitude is: ", lat)
      //console.log("Longitude is: ", long)

      //api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
      //lat=${lat}&lon=${long}
      await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(results => {
          setData(results)
          console.log(results);
        });
    }
    fetchData();
  }, [lat, long]);

  return (
    <div className="App">
      {(typeof data.main != 'undefined') ? (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {data.name}
            <br></br>
            Gefühlt {data.main.feels_like}°
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
