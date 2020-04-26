import React from 'react'
import '../../assets/icon/iconfont.css'
import './InformationItem.scss'

const InformationItem = (props) => {

  const middle = (middle) => {
    if (middle.type === 'img') {
      return <span className="information_item_middle_img"><img src={middle.url} alt=""/></span>
    } else if(middle.type === 'password') {
      const content = middle.content.split('').map(item => '·').join('')
      return <span className="information_item_middle_password">{content}</span>
    } else {
      return <span className="information_item_middle_font">{middle.content}</span>
    }
  }

  return (
    <div className='information_item'>
      <span className="information_item_left">{props.left}</span>
      {middle(props.middle)}
      <span className="information_item_right">
        <i className={props.right ?'iconfont ' +  props.right : 'iconfont null'}/>
      </span>
    </div>
  )
}

export default InformationItem
