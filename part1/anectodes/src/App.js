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

const points = { 0:0 ,1:0 ,2:0 ,3:0 ,4:0 ,5:0 ,6:0}

const App = () => {
  //------------------------------------------------------------------------------------------------------
  const handleClickAnecdote = () =>{
    const generateNumber = () => Math.floor(Math.random() * anecdotes.length)
    let previousNum = selected;
    let randomNum = generateNumber()

    while(previousNum === randomNum){
      randomNum = generateNumber()
    }
    previousNum = randomNum
    setSelected(selected = randomNum)
  }
  const handleClickVote = () =>{
    points[selected] += 1
    setVote(vote = {...points})
    
  }
  const findingMostVoted = () =>{
    let votes = [];
    for(const index in points){
      votes[index] = points[index]
    }
    let topVoted = Math.max(...votes)
    let anecdoteIndex = votes.indexOf(topVoted)

    if(topVoted === 0){
      return <p>No votes yet</p>
    }
    else{
      let grammar = "votes";
      if(topVoted === 1){
        grammar = "vote"
      }
      return <><p>"<b>{anecdotes[anecdoteIndex]}</b>" has {topVoted} {grammar} </p></>
    }

  }
  //------------------------------------------------------------------------------------------------------
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  let [selected, setSelected] = useState(0)
  let [vote,setVote] = useState({...points})
  
  //------------------------------------------------------------------------------------------------------
  const topVoted = findingMostVoted()
  
  return(
    <>
      <div className = "voting-section">
        <Header title = "Anectodes" element = "h1"/>
        <p>
          {anecdotes[selected]}<br/> votes : {vote[selected]}
        </p>
        <div className = "anectode-buttons">
          <Button onclick = {handleClickVote} option = {"Vote"} />
          <Button onclick = {handleClickAnecdote} option = {"next anecdote"} /><br/>
        </div>
      </div>
      <div>
        <Header title = {"Anectode with most votes"} element = "h2"/>
        {topVoted}
      </div>
    </>
    
    
    )
}
export default App