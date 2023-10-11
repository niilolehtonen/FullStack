import { useState, useEffect } from 'react'
import Filter from './components/filter.jsx'
import countryService from './services/countries.js'
import FindCountries from './components/findCountries.jsx'


function App() {
  const [filterCountry, setFilterCountry] = useState('')
  const [countries, setCountries] = useState([])
  
  const handleFilterChange = (event) => {
    setFilterCountry(event.target.value)
  }

  useEffect(() => {
    countryService
      .getAll()
      .then(countries => {
        setCountries(countries)
      })
  },[])
  
  return (
    <div>
      <Filter filter={filterCountry} change={handleFilterChange}/>
      <FindCountries countries={countries} filterCountry={filterCountry} setFilter={setFilterCountry}/>
    </div>
  )
}

export default App
