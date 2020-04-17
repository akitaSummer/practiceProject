import React, { useState } from 'react';

function Example2() {
    // useState不能在条件语句中
    const [ age, setAge ] = useState(18)
    const [ sex, setSex ] = useState('男')
    const [ work, setWork ] = useState('前端')
    return (
        <div>
            <p>age: {age}</p>
            <p>sex: {sex}</p>
            <p>work: {work}</p>
        </div>
    )
}
 
export default Example2;