import React, { useRef } from 'react'

function TextInputWithFocusButton() {
    const inputEl = useRef(null) // 获取dom
    const timeRef = useRef(new Date.now()) // 保存数据
    const onButtonClick = () => {
        // `current` 指向已挂载到 DOM 上的文本输入元素
        inputEl.current.focus()
        timeRef.current = new Date.now()
    }
    return (
        <>
            <input ref={inputEl} type="text" />
            <button onClick={onButtonClick}>Focus the input</button>
        </>
    )
}

export default TextInputWithFocusButton
