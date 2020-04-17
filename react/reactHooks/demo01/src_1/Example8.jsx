import React, { useRef, useState, useEffect } from 'react'

function Example8() {
    const inputEl = useRef(null)
    const onButtonClick = () => {
        inputEl.current.value = 'reacthooks'
    }

    const [text, setText] = useState('react')
    const textRef = useRef()

    useEffect(() => {
        textRef.current = text
        console.log('textRef.current', text)
    })

    return (
        <div>
            <input type="text" ref={inputEl}/>
            <button onClick={onButtonClick}>在input上显示文字</button>
            <br/>
            <br/>
            <input type="text" value={text} onChange={(e) => {setText(e.target.value)}}/>
        </div>
    )
}

export default Example8