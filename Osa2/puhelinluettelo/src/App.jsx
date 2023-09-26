import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  
  const addName = (event) => {
    event.preventDefault();
    const nameExists = persons.some((person) => person.name === newName);
    if (nameExists) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const nameObject = {
        name: newName,
      }
      setPersons(persons.concat(nameObject));
      setNewName('');
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}
           />
        </div>
        <div>
          <button key={newName} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <p key={index}>{person.name}</p>
      ))}
    </div>
  )

}

export default App