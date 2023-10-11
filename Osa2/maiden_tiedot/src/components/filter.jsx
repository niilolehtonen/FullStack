const Filter = ({filter, change}) => {
    return (
    <div>find countries
        <input value={filter} 
        onChange={change}/>
    </div>
    )
}

export default Filter