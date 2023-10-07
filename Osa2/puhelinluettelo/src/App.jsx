import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/filter.jsx'
import PersonForm from './components/personForm.jsx'
import Persons from './components/persons.jsx'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName,setFilterName] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])

  const addName = (event) => {
    event.preventDefault()

    const inPersons = persons.map(person => person.name)

    if (inPersons.includes(newName)){
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const changedNumber = {...person, number: newNumber}
        const id = person.id

        personService
          .changeNumber(id,changedNumber)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person: returnedPerson))
          })
          setNewName('')
          setNewNumber('')
      }
      return
    }

 
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    personService
    .create(nameObject)
    .then(returnedPersons => {
      setPersons(persons.concat(returnedPersons))
      setNewName('')
      setNewNumber('')
    })

  }
  
  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)

    if(window.confirm(`Delete ${person.name}`)) {
      personService
        .deletePerson(id)
          .then(
            setPersons(persons.filter(person => person.id !== id))
          )
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
      <Persons persons={persons} filterName={filterName} action={deletePerson}/>
    </div>
  )

}

export default App