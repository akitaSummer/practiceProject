import React from 'react'
import Part from "../Part";

import config from './config'

const Content = () => {
    return (
        <div>
          Content
          <ul>
            {
              config.map(item => <Part name={item.name} number={item.number}/>)
            }
          </ul>
        </div>
    )
}

export default Content
