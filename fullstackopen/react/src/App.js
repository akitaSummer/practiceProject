import React, { useState } from 'react';
import './App.css';
import Statistic from "./component/Statistic";

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
      <div>
          <div>
              <h2>give feedback</h2>
              <button onClick={() => setGood(good + 1)}>good</button>
              <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
              <button onClick={() => setBad(bad + 1)}>neutral</button>
          </div>
          <Statistic
            good={good}
            neutral={neutral}
            bad={bad}
          />
      </div>
    )
}

export default App;
