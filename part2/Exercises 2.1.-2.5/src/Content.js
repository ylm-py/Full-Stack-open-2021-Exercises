
const Header = (props) =>{
    const {Element,text} = props
    return <Element>{text}</Element>
  }
  
  const Part = (props) =>{
    const parts = props.parts
    const partsDisplay = parts.map(part=><p key={part.id}>{part.name} {part.exercises}</p>)
    const total = parts.reduce((p,c) => p + c.exercises  , 0)
    console.log("total : ",total)
    console.log("parts display : ",partsDisplay)
    return (
      <>
        {partsDisplay}
        <p>total of <b>{total}</b> exercises</p>
      </>
      )
    
  }
  
  
  const Content = (props) =>{
    const courses = props.courses
    const courseDisplay = courses.map(course=>{
      console.log(course)
      return (
        <div key = {course.id}>
          <Header Element = {`h${course.id}`} text = {course.name} />
          <Part parts = {course.parts}/>
        </div>
      )
  
      })
    console.log("course display : ",courseDisplay)
    return(
      <>
        {courseDisplay}
      </>
    )
    
  }
  export default Content