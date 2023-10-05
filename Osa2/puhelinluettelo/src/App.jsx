import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/filter.jsx'
import PersonForm from './components/personForm.jsx'
import Persons from './components/persons.jsx'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName,setFilterName] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  },[])

  const addName = (event) => {
    event.preventDefault()
    const nameExists = persons.some((person) => person.name === newName)
    if (nameExists) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      }
      axios
      .post('http://localhost:3001/persons', nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
    }
    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filterName} change={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm 
      addName={addName} 
      newName={newName} 
      handleName={handleNameChange}
      newNumber={newNumber}
      handleNumber={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName}/>
    </div>
  )

}

export default App