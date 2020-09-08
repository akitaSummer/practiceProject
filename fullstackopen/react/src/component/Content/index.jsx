import React from 'react'
import Part from "../Part";

const Content = (props) => {

  const { parts: config } = props

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
