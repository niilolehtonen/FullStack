import Person from './person.jsx'

const Persons = ({persons, filterName}) => {
    
    const filteredPersons = persons.filter((person) =>
  person.name.toLowerCase().includes(filterName.toLowerCase())
  )

    return(
        <div>
        {filteredPersons.map((person, index) => (
            <Person key={index} person={person}/>
          ))}
        </div>
    )
}

export default Persons