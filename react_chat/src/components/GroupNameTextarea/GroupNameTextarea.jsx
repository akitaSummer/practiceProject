import React from "react";
import PropTypes from 'prop-types'
import './GroupNameTextarea.scss'
import Title from "../Title/Title";

const GroupNameTextarea = (props) => {

  const left = {
    type: 'icon',
    icon: 'icon-back',
    click: () => {
      props.setNameTextareaShow(false)
    }
  }

  const right = {
    type: 'img',
    url: require('../../assets/image/more.png')
  }

  return (
    <div className="create_group_name_textarea">
      <Title left={left} middle={'创建群聊'} right={right}/>
      <textarea placeholder='群名称' onChange={(e) => {props.setNameTextarea(e.currentTarget.value)}}>{props.nameTextarea}</textarea>
    </div>
  )
}

GroupNameTextarea.propTypes = {
  setNameTextarea: PropTypes.func,
  setNameTextareaShow: PropTypes.func,
  nameTextarea: PropTypes.string
}


export default GroupNameTextarea
