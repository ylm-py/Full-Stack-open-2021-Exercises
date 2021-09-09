import React, { useState } from 'react';
import "./index.css";

const Header = (props) =>{
  let Element = props.element
  return(
    <Element>
      {props.title }
    </Element>
  )
}
const Button = (props) =>{
  return(
    <>
    <button className = "button-styling" onClick = {props.onclick}>{props.option}</button>
    </>
  )
}

const StatisticLine = (props) =>{
  const {text,value} = props
  return(
    <>
      <p > {text} : {value}</p>
    </>
  )
}
const HtmlTable = (props) =>{
  const arr = props.array
  let column = []
    arr.map((elem , index) => column.push(
      <tr key = {index} >
        <th  >{elem.props.text} :</th>
        <td  >{elem.props.value}</td>
      </tr>
    )
    )
    //console.log(column)
  return(
    <table>
      <thead></thead>
        <tbody>
          {column}
        </tbody>
      <tfoot></tfoot>
    </table>
  )
}
const NoFeedbackGiven = () =>{
  return(
    <p>No feedback given </p>
  )
}
const notNumberCheck = (x) =>{
  if (isNaN(x)) {
    return 0;
  }
  return x;
}
const DisplayStatistics = (props) =>{
  let {options,values,total,average,positivePercent} = props
  let container =[]
  average = notNumberCheck(average)
  positivePercent = notNumberCheck(positivePercent)

  let statistics = 
    [
    <StatisticLine key = {"all"} text = {"all"} value = {total}  />,
    <StatisticLine key = {"average"} text = {"Average"} value = {average}  />,
    <StatisticLine key = {"positive"} text = {"Positive"} value = {positivePercent}  />
    ]  

  let counter = 0
  values.forEach((num,index)=>{
    if(num === 0 ){
      counter++
    }
    let stats;
    stats = <StatisticLine key = {index} text = {options[index]} value = {values[index]}  />
    container.push(stats);
  }
  )
  container.concat(statistics)

  //using the condional rendering 
  if(counter === 3 ){
    return(
      <NoFeedbackGiven/>
    )
  }
  else{
    return(
      <HtmlTable array = {container} />
    )
  }
}
const App = () => {
  //------------------------------------------------------------------------------------------------------
  const handleClickFeedback = (func,value) => {
    const addOne = () =>{
      func(value+1)
    }
    return addOne
  }
  const getTotal = () => 
  {
    let ans = 0
    values.map(x => ans += x)
    return ans
  }
  const getAverage = () => (good - bad) / total
  const getPositivePercent = () =>(good * 100) /total

  //------------------------------------------------------------------------------------------------------
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const values = [good,neutral,bad]
  const options = ["Good","Neutral","Bad"]

  //------------------------------------------------------------------------------------------------------
  const total = getTotal()
  const average = getAverage()
  const positivePercent = getPositivePercent()

  return(
    <>
      <div>
        <Header title = {"Give feedback"} element = "h1"  />
        <Button onclick = {handleClickFeedback(setGood,good)} option = {options[0]} />
        <Button onclick = {handleClickFeedback(setNeutral,neutral)} option ={options[1]}  />
        <Button onclick = {handleClickFeedback(setBad,bad)} option = {options[2]} />
      </div>

      <div className = "stats">
        <Header title = {"Statistics"} element = "h2" />
        <DisplayStatistics options = {options} values = {values} total={total} average = {average} positivePercent = {positivePercent} />
      </div>
    </>
    
    
    )
}
export default App

