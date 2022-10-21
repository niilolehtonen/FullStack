import { useState } from 'react'

const StatisticLine = (props) => {
  if (props.text === "positive") {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}%</td>
      </tr>
      )  
    }
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
    )
  }

const Statistics = (props) =>{
  if (props.all === 0) {
    return(
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text = "good" value = {props.good}/>
          <StatisticLine text = "neutral" value = {props.neutral}/>
          <StatisticLine text = "bad" value = {props.bad}/>
          <StatisticLine text = "all" value = {props.all}/>
          <StatisticLine text = "average" value = {props.average/props.all}/>
          <StatisticLine text = "positive" value = {(props.good/props.all)*100}/>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAverage(average + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage(average - 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => handleGoodClick()} text = "good"/>
      <Button handleClick={() => handleNeutralClick()} text = "neutral"/>
      <Button handleClick={() => handleBadClick()} text = "bad"/>
      <h1>statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad} all = {all} average = {average}/>
    </div>
  )
}

export default App