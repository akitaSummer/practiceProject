import React, { useRef } from 'react'

const PersonForm = ({ persons, setPersons, setShowPersons }) => {

  const name = useRef(null)
  const number = useRef(null)

  const handleClick = () => {
    if (!name || name.current.value.length === 0) {
      alert('please enter name')
    } else if (persons.filter(person => person.name.includes(name.current.value)).length > 0) {
      alert(`${name.current.value} is already added to phonebook`)
    } else {
      setPersons([
        ...persons,
        {
          name: name.current.value,
          number: number.current.value
        }
      ])
      name.current.value = ''
      number.current.value = ''
    }
  }

  return (
    <React.Fragment>
      <span>name: </span><input type="text" ref={name}/>
      <span>number: </span><input type="text" ref={number}/>
      <button onClick={(e) => handleClick()}>add</button>
    </React.Fragment>
  )
}

export default PersonForm
