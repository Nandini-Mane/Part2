import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  // Add new person
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = { name: newName }

    setPersons(persons.concat(personObject))
    setNewName('')
  }

  // Handle input change
  const handleNameChange = (event) => setNewName(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
      />

      {/* Debug (optional) */}
      <div>debug: {newName}</div>

      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App
