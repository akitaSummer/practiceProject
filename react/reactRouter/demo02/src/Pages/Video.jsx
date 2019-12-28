import React from 'react';
import { Route, Link } from 'react-router-dom'
import ReactPage from './video/ReactPage'
import Flutter from './video/Flutter'
import Vue from './video/Vue'

const Video = () => {
    return (
        <div>
            <div className="topNav">
                <ul>
                    <li><Link to='/video/reactpage/'>React</Link></li>
                    <li><Link to='/video/flutter/'>Flutter</Link></li>
                    <li><Link to='/video/vue/'>Vue</Link></li>
                </ul>
            </div>
            <div className="videoContent">
                <div><h3>视频教程</h3></div>
                <Route path='/video/reactpage/' component={ReactPage}></Route>
                <Route path='/video/flutter/' component={Flutter}></Route>
                <Route path='/video/vue/' component={Vue}></Route>
            </div>
        </div>
    )
}
 
export default Video;