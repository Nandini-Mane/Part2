const CountryList = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length <= 10 && countries.length > 1) {
    return (
      <ul>
        {countries.map(country => (
          <li key={country.name.common}>{country.name.common}</li>
        ))}
      </ul>
    )
  }

  return null
}

export default CountryList
