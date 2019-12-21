import React, { Component } from 'react'

import Sister from './Sister'
import Boss from './Boss'

class App extends Component {
    render() {
        return (
            <div>
                <ul className='my-list'>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                </ul>
                <Sister></Sister>
                <Boss></Boss>
            </div>
        )
    }
}

export default App