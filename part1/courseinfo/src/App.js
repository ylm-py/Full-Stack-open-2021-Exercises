import React from 'react'

const Header = (props) =>{
  return(
    <h1>
      {props.courseName}
    </h1>
  )
}

const Part = (props) => {
  return(
    <p>{props.part} {props.exercice}</p>
  )
}

const Content = (props) =>{
  return(
    <>
      <Part part = {props.parts[0].name} exercice = {props.parts[0].exercises}  />
      <Part part = {props.parts[1].name} exercice = {props.parts[1].exercises}  />
      <Part part = {props.parts[2].name} exercice = {props.parts[2].exercises}  />
    </>
  )
}

const Total = (props) =>{
  return(
    <p>
      Number of exercises {props.sum}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  const total = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
  return (
    <div>
      <Header courseName = {course.name} />
      <Content parts = {course.parts}/>
      <Total sum = {total} />
    </div>
  )
}

export default App