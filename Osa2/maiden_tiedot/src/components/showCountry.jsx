import Weather from "./weather"

const ShowCountry = ({country}) => {
    return(
      <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <b>languages:</b>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img id='flag' src={country.flags.png} width={150}/>
      <Weather country={country}/>
      </>
    )
  }

export default ShowCountry