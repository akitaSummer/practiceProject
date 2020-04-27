import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom'
import './MessageContent.scss'
import PropTypes from "prop-types";
import user from '../../assets/img/v2-1.jpg'

const MessageContent = (props) => {

  const history = useHistory()

  const goDetail = (type) => {
    if (type === 'group') {
      history.push('/group_detail')
    } else {
      history.push('/user_detail')
    }
  }

  useEffect(() => {
    // 163 361
    window.scroll(0, 163)
  }, [props.menu])

  const { url } = props.chatContent

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

  return (
    <div onClick={() => { props.setMenu(false) }} className={ props.menu ? 'message_content message_content_menu' : 'message_content'}>
      {
        props.chatContent.messages.map((item, i) => {
          if (i === 0) {
            return (
              <div key={i}>
                <p className="time">
                  {formData(item.time)}
                </p>
                <div className={item.send === 'user' ? 'user_message' : 'other_message'}>
                  <img src={item.send === 'user' ? user : url } alt="" className="image" onClick={() => {item.send === 'user' ? goDetail('user') : goDetail(props.chatContent.type)}}/>
                  {
                    item.content ? (<p className={"message_content_short"}>{item.content}</p>)
                      :
                      (<img src={item.url} alt="" className="send_image"/>)
                  }
                </div>
              </div>
            )
          } else {
            const time = item.time - props.chatContent.messages[i - 1].time
            return time > 300000 ? (
              <div key={i}>
                <p className="time">
                  {formData(item.time)}
                </p>
                <div className={item.send === 'user' ? 'user_message' : 'other_message'}>
                  <img src={item.send === 'user' ? user : url } alt="" className="image" onClick={() => {item.send === 'user' ? goDetail('user') : goDetail(props.chatContent.type)}}/>
                  {
                    item.content ? (<p className={"message_content_short"}>{item.content}</p>)
                      :
                      (<img src={item.url} alt="" className="send_image"/>)
                  }
                </div>
              </div>
            ):(
              <div key={i}>
                <div className={item.send === 'user' ? 'user_message' : 'other_message'}>
                  <img src={item.send === 'user' ? user : url } alt="" className="image" onClick={() => {item.send === 'user' ? goDetail('user') : goDetail(props.chatContent.type)}}/>
                  {
                    item.content ? (<p className={"message_content_short"}>{item.content}</p>)
                      :
                      (<img src={item.url} alt="" className="send_image"/>)
                  }
                </div>
              </div>
            )
          }
        })
      }
    </div>
  )
}


MessageContent.propTypes = {
  setMenu: PropTypes.func,
  chatContent: PropTypes.object,
  menu: PropTypes.bool
}

export default MessageContent
