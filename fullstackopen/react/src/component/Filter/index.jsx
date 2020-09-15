import React, { useEffect, useRef, useCallback } from 'react'

const Filter = ({ persons, setShowPersons }) => {

  const input = useRef(null)

  const updateShowPersons = useCallback((e) => {
    const fileterPersons = persons.filter(person => person.name.includes(e.target.value))
    setShowPersons(fileterPersons)
  }, [setShowPersons, persons])

  useEffect(() => {
    updateShowPersons({ target: input.current })
  }, [persons, updateShowPersons])

  return (
    <React.Fragment>
      <span>filter shown with</span><input type="text" onChange={(e) => updateShowPersons(e)} ref={input}/>
    </React.Fragment>
  )
}

export default Filter
