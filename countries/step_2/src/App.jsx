import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setSelectedCountry(null);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  const renderCountryDetails = (country) => {
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
  };

  const renderCountries = () => {
    if (search === "") {
      return null;
    } else if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (filteredCountries.length > 1) {
      return (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredCountries.map((country) => (
            <li key={country.cca3} style={{ marginBottom: "8px" }}>
              {country.name.common}{" "}
              <button
                onClick={() => handleShowCountry(country)}
                style={{
                  backgroundColor: "#007bff", // blue background
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "4px 10px",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
              >
                Show
              </button>
            </li>
          ))}
        </ul>
      );
    } else if (filteredCountries.length === 1) {
      return renderCountryDetails(filteredCountries[0]);
    } else {
      return <p>No matches found</p>;
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9", // light background
        minHeight: "100vh",
        color: "#222",
      }}
    >
      <label htmlFor="search">
        <strong>find countries </strong>
      </label>
      <input
        id="search"
        value={search}
        onChange={handleSearchChange}
        style={{
          padding: "6px",
          fontSize: "16px",
          marginLeft: "5px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      {selectedCountry
        ? renderCountryDetails(selectedCountry)
        : renderCountries()}
    </div>
  );
};

export default App;
