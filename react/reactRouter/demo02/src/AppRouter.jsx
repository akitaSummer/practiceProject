import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Index from './Pages/Index'
import Video from './Pages/Video'
import WorkPlace from './Pages/WorkPlace'
import './index.css'

const AppRouter = () => {
    let routeConfig = [
        {
            path: '/',
            title: '博客首页',
            exact: true,
            component: Index
        },
        {
            path: '/video/',
            title: '视频教程',
            exact: false,
            component: Video
        },
        {
            path: '/workplace/',
            title: '职场技能',
            exact: false,
            component: WorkPlace
        },
    ]
    return (
        <BrowserRouter>
            <div className='mainDiv'>
                <div className="leftNav">
                    <h3>一级导航</h3>
                    <ul>
                        {routeConfig.map((item, i) => {
                            return (<li key={item + i}><Link to={item.path}>{item.title}</Link></li>)
                        })}
                    </ul>
                </div>
                <div className="rightMain">
                    {routeConfig.map((item, i) => {
                        return (<Route key={item + i} path={item.path} exact={item.exact} component={item.component}></Route>)
                    })}
                </div>
            </div>
        </BrowserRouter>
    )
}
 
export default AppRouter