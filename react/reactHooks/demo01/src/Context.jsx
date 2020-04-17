import React, { useState } from 'react'

// Context组件：可以将数据传递给后代组件
// 1.初始化Context组件
const CountContext = React.createContext(0)

function A() {
    const [count, setCount] = useState(1)
    // 2.使用Context.Provider组件将需要被传递数据的子组件包裹
    return (
        <>
            <CountContext.Provider value={count}>
                <B></B>
            </CountContext.Provider>
            <button
                onClick={() => {
                    setCount(count + 1)
                }}
            ></button>
        </>
    )
}

function B() {
    return <C></C>
}

function C() {
    // 3. 使用Context.Consumer组件将需要获取数据的组件包裹，内部使用回调函数获取数据
    return (
        <CountContext.Consumer>
            {(count) => <div>count = {count}</div>}
        </CountContext.Consumer>
    )
}

export default A
