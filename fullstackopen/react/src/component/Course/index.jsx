import React from "react";

const Course = ({ courses }) => {
  return (
    <React.Fragment>
      <h2>web development curriculum</h2>
      {
        courses.map(course => {
          return (
            <div key={course.id + Date.now()}>
              <h3>{ course.name }</h3>
              <ul>
                {
                  course.parts.map(part => <li key={part.id + Date.now()}>{ part.name + ` ${part.exercises}`}</li>)
                }
              </ul>
            </div>
          )
        })
      }
      <h3>total of {courses.reduce((prev, item) => prev + item.parts.reduce((before, part) => before + part.exercises, 0), 0)} exercises</h3>
    </React.Fragment>
  )
}

export default Course
