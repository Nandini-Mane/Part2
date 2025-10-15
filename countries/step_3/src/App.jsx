import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [weather, setWeather] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const api_key = import.meta.env.VITE_SOME_KEY;

  // fetch all countries once
  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  // fetch weather when selectedCountry changes
  useEffect(() => {
    if (selectedCountry && api_key) {
      const capital = selectedCountry.capital?.[0];
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`;

      axios.get(weatherUrl)
        .then(response => setWeather(response.data))
        .catch(error => {
          console.error("Error fetching weather:", error);
          setWeather(null);
        });
    }
  }, [selectedCountry, api_key]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setSelectedCountry(null);
    setWeather(null);
  };

  const handleShow = (country) => {
    setSelectedCountry(country);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  const renderCountries = () => {
    if (selectedCountry) {
      const country = selectedCountry;
      return (
        <div>
          <h2>{country.name.common}</h2>
          <p><strong>Capital:</strong> {country.capital?.[0]}</p>
          <p><strong>Area:</strong> {country.area}</p>
          <h3>Languages:</h3>
          <ul>
            {Object.values(country.languages || {}).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            width="150"
          />

          <h3>Weather in {country.capital?.[0]}</h3>
          {weather ? (
            <div>
              <p>Temperature: {weather.main.temp} °C</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather icon"
              />
              <p>Wind: {weather.wind.speed} m/s</p>
            </div>
          ) : (
            <p>Loading weather...</p>
          )}
        </div>
      );
    }

    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (filteredCountries.length > 1) {
      return (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.name.common}>
              {country.name.common}{" "}
              <button
                onClick={() => handleShow(country)}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Show
              </button>
            </li>
          ))}
        </ul>
      );
    } else if (filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0]);
    }

    return null;
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial" }}>
      <h1>Country Finder</h1>
      <div>
        Find countries:{" "}
        <input value={filter} onChange={handleFilterChange} />
      </div>
      <div style={{ marginTop: "1rem" }}>{renderCountries()}</div>
    </div>
  );
};

export default App;
