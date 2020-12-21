import React, { forwardRef } from 'react'

const RedLink = forwardRef((props, ref) => {
    return <a href={props.href} ref={ref}>click me</a>
})

export default RedLink
