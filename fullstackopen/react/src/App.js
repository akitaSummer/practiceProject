import React from 'react';
import './App.css';
import Header from './component/Header'
import Content from './component/Content'
import Total from './component/Total'

const App = () => {
    const course = 'Half Stack application development'

    return (
      <div>
        <Header course={course}/>
        <Content/>
        <Total/>
      </div>
    )
}

export default App;
