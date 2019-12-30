import React, { useState, useMemo } from 'react'

function Example7() {
    const [color, setColor] = useState('red')
    const [count, setCount] = useState(0)
    return (
        <div>
            <button onClick={() => {setColor(new Date().getTime())}}>color</button>
            <button onClick={() => {setCount(new Date().getTime()+'123')}}>count</button>
            <ChildComponent name={color}>{count}</ChildComponent>
        </div>
    )
}

function ChildComponent({name, children}) {

    function changeColor() {
        console.log('changeColor')
        return name+'color'
    }

    const actionColor = useMemo(() => changeColor(name), [name]) 

    return (
        <div>
            <div>{children}</div>
            <div>{actionColor}</div>
        </div>
    )
}

export default Example7