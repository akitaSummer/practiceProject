import React from 'react'

const Part = (props) => {
  return (
    <li>
      name: { props.name }
      <br/>
      exercises: { props.number }
    </li>
  )
}

export default Part
