import React from "react";
import PropTypes from 'prop-types'
import './MessageInput.scss'
import { CSSTransition } from 'react-transition-group'
import voice from '../../assets/image/语音.png'
import emo from '../../assets/image/表情.png'
import add from '../../assets/image/添加.png'
import photo from '../../assets/image/照片.png'
import camera from '../../assets/image/相机.png'
import site from '../../assets/image/定位.png'
import video from '../../assets/image/视频.png'
import file from '../../assets/image/文件.png'

const MessageInput = (props) => {

  return (
    <CSSTransition
      in={ props.menu } // 如果this.state.show从false变为true，则动画入场，反之out出场
      timeout={500} //动画执行1秒
      classNames='menu' //自定义的class名
    >
    <div className='message_input'>
      <div className="user_input">
        <img src={voice} alt="" className="voice"/>
        <input type="text"/>
        <div className="right">
          <img src={emo} alt="" className="emo"/>
          <img src={add} alt="" className="add" onClick={ () => { props.setMenu(true) } }/>
        </div>
      </div>

        <div className="input_menu">
          <div className="item">
            <div className="img_container">
              <img src={photo} alt="" className='menu_item'/>
            </div>
            <span className="name">照片</span>
          </div>
          <div className="item">
            <div className="img_container">
              <img src={camera} alt="" className='menu_item'/>
            </div>
            <span className="name">拍摄</span>
          </div>
          <div className="item">
            <div className="img_container">
              <img src={site} alt="" className='menu_item'/>
            </div>
            <span className="name">位置</span>
          </div>
          <div className="item">
            <div className="img_container">
              <img src={video} alt="" className='menu_item'/>
            </div>
            <span className="name">视频</span>
          </div>
          <div className="item">
            <div className="img_container">
              <img src={file} alt="" className='menu_item'/>
            </div>
            <span className="name">文件</span>
          </div>
          <div className="item"/>
          <div className="item"/>
          <div className="item"/>
        </div>

    </div>
    </CSSTransition>
  )
}

MessageInput.propTypes = {
  menu: PropTypes.bool,
  setMenu: PropTypes.func
}


export default MessageInput
