import React, { useState, useEffect } from 'react'

const MouseTracker = () => {
  const [ positions, setPositions ] = useState({ x: 0, y: 0})
  useEffect(() => {
    const updateMouse = (event) => {
      setPositions({
        x: event.pageX,
        y: event.pageY
      })
    }
    document.addEventListener('mousemove', updateMouse)
    return () => {
      document.removeEventListener('mousemove', updateMouse)
    }
  })
  return (
    <p>
      X: {positions.x}, Y: {positions.y}
    </p>
  )
}

export default MouseTracker
