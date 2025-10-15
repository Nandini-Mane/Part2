import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch country data once
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Filter countries by search term
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  // Render country info based on matches
  const renderCountries = () => {
    if (search === "") {
      return null;
    } else if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (filteredCountries.length > 1) {
      return (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.cca3}>{country.name.common}</li>
          ))}
        </ul>
      );
    } else if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      const languages = country.languages ? Object.values(country.languages) : [];

      return (
        <div style={{ marginTop: "20px" }}>
          <h1>{country.name.common}</h1>
          <p><strong>Capital:</strong> {country.capital}</p>
          <p><strong>Area:</strong> {country.area}</p>

          <h3>Languages</h3>
          <ul>
            {languages.map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>

          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            width="200"
            style={{ border: "1px solid #ddd", marginTop: "10px" }}
          />
        </div>
      );
    } else {
      return <p>No matches found</p>;
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <label htmlFor="search">
        <strong>find countries </strong>
      </label>
      <input
        id="search"
        value={search}
        onChange={handleSearchChange}
        style={{
          padding: "5px",
          fontSize: "16px",
          marginLeft: "5px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      {renderCountries()}
    </div>
  );
};

export default App;
