const Person = ({person, index}) => {
    return (
        <div>
            <p key={index}>{person.name} {person.number}</p>
        </div>
    )
}

export default Person