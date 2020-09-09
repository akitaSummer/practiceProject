import React from 'react'

const StatisticItem = (props) => {
  const { text, value } = props
  return (
    <p>{ text } { value }</p>
  )
}

export default StatisticItem
