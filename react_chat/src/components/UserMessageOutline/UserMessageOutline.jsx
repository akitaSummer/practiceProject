import React, { useRef, useState } from "react";
import './UserMessageOutline.scss'
import PropTypes from 'prop-types'

const UserMessageOutline = (props) => {

  const node = useRef(0)
  const [mouseDown, setMouseDown] = useState(false)

  // 格式化日期
  const formData = (time) => {
    const now = new Date()
    if (time.getFullYear() < now.getFullYear()) {
      return `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDay()}`
    } else if (time.getMonth() < now.getMonth() || time.getDate() < now.getDate()) {
      return `${time.getMonth() + 1}.${time.getDate()}`
    } else {
      return time.getHours() > 12 ? `下午${time.getHours() - 12}:${time.getMinutes()}` : `上午${time.getHours()}:${time.getMinutes()}`
    }
  }

  const changeClassName = () => {
    setMouseDown(!mouseDown)
  }

  return (
    <div
      className={mouseDown ? 'user_message_outline active' : 'user_message_outline'}
      ref={node}
      onMouseDown={changeClassName}
      onMouseUp={changeClassName}
      onTouchStart={changeClassName}
      onTouchEnd={changeClassName}
    >
      <div className="user_icon">
        <img className="icon" src={props.user.url} alt='icon'/>
        {props.user.noRead > 0 ? <span className="number">{props.user.noRead}</span> : ''}
      </div>
      <div className="user_message">
        <span className="user_name">{props.user.name}</span>
        <span className="user_message_content">{props.user.lastMessage}</span>
        <span className="time">{formData(props.user.time)}</span>
      </div>
    </div>
  )
}

UserMessageOutline.propTypes = {
  user: PropTypes.object
}

export default UserMessageOutline
