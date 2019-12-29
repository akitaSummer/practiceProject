import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'

function Index() {
    useEffect(() => {
        console.log(`useEffect Index`)
        return () => {
            console.log(`end Index`)
        }
    }, []) // 第二个参数接收一个数组，数组中的对象改变时，会执行return函数， 如果为空数组，则在解绑时执行return
    return <h2>Index</h2>
}

function List() {
    useEffect(() => {
        console.log(`useEffect List`)
        return () => {
            console.log(`end List`)
        }
    }, [])
    return <h2>List</h2>
}

function Example() {
    const [ count, setCount ] = useState(0) // 数组解构赋值
    useEffect(() => {
        console.log(`useEffect ${count}`)
        return () => {
            console.log(count)
        }
    }, [count])
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => {setCount(count + 1)}}>Click me</button>
            <BrowserRouter>
                <ul>
                    <li><Link to='/'>首页</Link></li>
                    <li><Link to='/list/'>列表</Link></li>
                </ul>
                <Route path='/' exact component={Index}></Route>
                <Route path='/list/' component={List}></Route>
            </BrowserRouter>
        </div>
    )
}
 
export default Example;