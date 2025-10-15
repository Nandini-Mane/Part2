import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

// Get all persons
const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

// Create a new person
const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then(response => response.data)
}

// Update an existing person (optional for step 2.14)
const update = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson).then(response => response.data)
}

// Delete a person (optional for step 2.15)
const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, remove }
