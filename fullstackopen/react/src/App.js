import React from 'react';
import './App.css';
import Header from './component/Header'
import Content from './component/Content'
import Total from './component/Total'

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [{
            name: 'Fundamentals of React',
            number: 10
        }, {
            name: 'Using props to pass data',
            number: 7
        }, {
            name: 'State of a component',
            number: 14
        }]
    }

    return (
      <div>
        <Header course={course}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
}

export default App;
