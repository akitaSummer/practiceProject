import React, { useState, useEffect } from 'react'

function Example() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        // componentDidMounted 和 componentDidUpdated
        document.title = `You clicked ${count} times`
        const intervalId = setInterval(() => {
            console.log(count)
        }, 1000)
        return () => {
            clearInterval(intervalId)
        }
    }, []) // 在有第二个参数时，只会在创建和数组中元素变化时调用useEffect

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    )
}

export default Example
