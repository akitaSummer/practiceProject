import React from 'react'
import StatisticItem from "../StatisticItem";

const Statistic = (props) => {
  const { good, neutral, bad } = props

  const all = good + neutral + bad

  const average = (good - bad) / all

  const positive = good / all

  return all === 0 ? (
    <div>
      <h2>statistic</h2>
      <StatisticItem text={'good'} value={good}/>
      <StatisticItem text={'neutral'} value={neutral}/>
      <StatisticItem text={'bad'} value={bad}/>
      <StatisticItem text={'all'} value={all}/>
      <StatisticItem text={'average'} value={average}/>
      <StatisticItem text={'positive'} value={positive}/>
    </div>
  ) : (
    <div>
      <h2>statistic</h2>
      <p>No feedback given</p>
    </div>
  )
}

export default Statistic
