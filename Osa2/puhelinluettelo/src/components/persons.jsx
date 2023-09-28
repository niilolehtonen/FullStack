const Persons = ({persons, filterName}) => {
    
    const filteredPersons = persons.filter((person) =>
  person.name.toLowerCase().includes(filterName.toLowerCase())
  )

    return(
        <div>
        {filteredPersons.map((person, index) => (
            <p key={index}>{person.name} {person.number}</p>
          ))}
        </div>
    )
}

export default Persons