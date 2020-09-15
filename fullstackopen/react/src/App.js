import React, { useState } from 'react';
import Filter from "./component/Filter";
import PersonForm from "./component/PersonForm";
import Persons from "./component/Persons";
import './App.css';

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [showPersons, setShowPersons] = useState(persons)


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter persons={persons} setShowPersons={setShowPersons}/>

      <h3>Add a new</h3>

      <PersonForm setPersons={setPersons} persons={persons} setShowPersons={setShowPersons}/>

      <h3>Numbers</h3>

      <Persons showPersons={showPersons}/>
    </div>
)

}

export default App;
