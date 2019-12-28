import React from 'react'
import { Link, Route } from 'react-router-dom'
import GetUp from './workplace/GetUp'
import Money from './workplace/Money'

const WorkPlace = () => {
    return (
        <div>
            <div className="topNav">
                <ul>
                    <li><Link to='/workplace/getup/'>GetUp</Link></li>
                    <li><Link to='/workplace/money/'>Money</Link></li>
                </ul>
            </div>
            <div className="videoContent">
                <div><h3>职场</h3></div>
                <Route path='/workplace/getup/' component={GetUp}></Route>
                <Route path='/workplace/money/' component={Money}></Route>
            </div>
        </div>
    )
}

export default WorkPlace