import React from 'react'

const Persons = ({ showPersons }) => {
  return (
    <React.Fragment>
      {showPersons.map(person => <p key={person.name + Date.now()}>{`${person.name}: ${person.number}`}</p>)}
    </React.Fragment>
  )
}

export default Persons
