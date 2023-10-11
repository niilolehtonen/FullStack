import { useState } from 'react'
import ShowCountry from './ShowCountry'

const FindCountries = ({ countries, filterCountry, setFilter }) => {
  if (filterCountry === '') {
    return null
  }

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filterCountry.toLowerCase())
  )


  const handleShowClick = (country) => {
    console.log(country)
    setFilter(country.name.common)
  }


  if (filteredCountries.length === 1) {
    return (
      <div>
        <ShowCountry country={filteredCountries[0]} />
      </div>
    )
  } else if (filteredCountries.length > 1 && filteredCountries.length < 10) {
    return (
      <div>
        {filteredCountries.map((country) => (
          <div key={country.name.common}>
            <p>{country.name.common}</p>
            <button onClick={() => handleShowClick(country)}>show</button>
          </div>
        ))}
      </div>
    )
  } else if (filteredCountries.length >= 10) {
    return <div>Too many matches, specify another filter</div>
  } else {
    return <div>No matches, specify another filter</div>
  }
}

export default FindCountries;