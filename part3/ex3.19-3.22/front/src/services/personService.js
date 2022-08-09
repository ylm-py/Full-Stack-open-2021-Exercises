import axios from 'axios'
import { config } from '../Constants';

const baseUrl = config.url

const getAllPersons = () =>{
    return axios.get(baseUrl + '/api/persons')
}

const addPerson = (person) =>{
    return axios.post(baseUrl + '/api/persons', person)
}

const deletePerson = (id) =>{
    return axios.delete(baseUrl + '/api/' + id)
}

const updatePerson = (id, person) =>{
    return axios.put(baseUrl + '/api/' + id, person)
}
const Services = { getAllPersons, addPerson, deletePerson, updatePerson }
export default Services