import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css' 

const API_KEY = process.env.REACT_APP_API_KEY
const DisplayMultipleCountries = (props) =>{
  const {filtered,handleButton} = props
  return(
    <>
      <ul className = "multi-countries">
      {filtered.map(country => {
        return <li className = "country-line" key={country}>
            {country} 
            <button className = "button-styling" onClick = {handleButton} type = 'button' value = {country}>show</button>
              </li>
      })}  
    </ul>
    </>
  )
}

const DisplaySingleCountry = (props) =>{
  const {responseData,filtered} = props
  const [weather,setweather] = useState([])
  let countryName;
  const getLanguages = (obj) =>{
    let array =[];
    for(const prop in obj){
      array.push(obj[prop])
    }
    return array
  }
  if(typeof filtered == "object"){
    countryName = filtered[0]
  }
  else {
    countryName = filtered
  }

  const countryDetails = responseData.filter(data=>data.name.common === countryName)[0]
  // console.log("country details : ",countryDetails)
  const languagesObj = countryDetails.languages
  const languages = getLanguages(languagesObj)
  const countryCapital = countryDetails.capital
  const hook = () =>{
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${countryCapital[0]}&appid=${API_KEY}`)
    .then(data=> setweather(data))
    .catch(err => console.log(err))
  }
  useEffect(hook,[countryCapital])

  console.log("country weather data : ",weather.data)
  console.log(weather)
  return(
    <>
    <div>
      <h2>{countryDetails.name.common}</h2>
      <p>capital : {countryCapital}</p>
      <p>population : {countryDetails.population}</p>
      <h3>Languages : </h3>
      <ul>
      {languages.map(language=><li key = {language}>{language}</li>)}
      </ul>
      <img className = "country-flag" src = {countryDetails.flags.png} alt = {countryDetails.name.common}></img>
    </div>
    <div className="weather-section">
      <p>Weather in {countryCapital}</p>
      {/* <p>Wind speed : {weather.data.wind.speed}</p> */}
    </div>
    </>
    
  )
}


const filterCountries = (array,searchedCountry) =>{
  return array.filter(country=>country.slice(0,searchedCountry.length).toLowerCase().trim() === searchedCountry.toLowerCase().trim())

}
const Result = (props) =>{

  const {countriesNames,searchInput,responseData} = props
  const [clickedCountry,setShowCountry] = useState({clicked:false})
  let result;

  let filtered = filterCountries(countriesNames,searchInput)
  // console.log("loaded countries" ,filtered)
  const isSearchBarEmpty =  searchInput === '';
  
  const handleSelfClickedButton =  (event) =>{
    const clickedCountry = event.target.value
    setShowCountry({clicked: true,countryName:clickedCountry})
  }
  if(isSearchBarEmpty){
    
    result = <p>type a name of a country in the search bar</p>
  }
  // if(isShowClicked){
    
  // }
  if(clickedCountry.clicked){
    result = <DisplaySingleCountry filtered = {clickedCountry.countryName} responseData = {responseData}/>
  }
  else if(filtered.length === 1){
    
    result = <DisplaySingleCountry filtered ={filtered} responseData = {responseData}/>
  }
  
  else if(filtered.length >=10 ){
    result = <p>Too many results found , please specify another filter .</p>
  }


  else if(filtered.length < 10){
    result = <DisplayMultipleCountries filtered ={filtered} handleButton = {handleSelfClickedButton}/>
  }
  if(filtered.length === 0){
    
    result = <p>No country found by the name : {searchInput}</p>
  }
  clickedCountry.clicked = false

  
  return(
    <div>
      <h1>Results : </h1>
      {result}
    </div>
  )
}
//{result}

const App = () => {
  const [searchInput,setSearchInput] = useState('')
  const [response,setResponse] = useState([])
  const hook = () =>{
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => setResponse(response) )
    .catch(err=>console.log(err))
  }
  useEffect(hook,[])
  
  const countriesNames = response.data.map(country=>country.name.common)

  
  
  const handleSearchInput = (event) =>{
    const inputValue = event.target.value
    console.log(inputValue)
    setSearchInput(inputValue)
  }
  
  
  return (
    <div>
      <form>
        Search for a country by name : <input value = {searchInput} onChange = {handleSearchInput} type = "text"/>
      <Result 
      countriesNames = {countriesNames} 
      responseData = {response.data} 
      searchInput = {searchInput}/>
     
      </form>
    </div>
  )
}
/**/

export default App