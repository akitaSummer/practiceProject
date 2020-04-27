import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/actions'
import Title from "../../components/Title/Title";
import GroupNameTextarea from "../../components/GroupNameTextarea/GroupNameTextarea";

import './CreateGroup.scss'

const CreateGroup = (props) => {

  const [checkedUsers, setCheckedUsers] = useState([])
  const [nameTextarea, setNameTextarea] = useState('')
  const [nameTextareaShow, setNameTextareaShow] = useState(false)

  const history = useHistory()

  const left = {
    type: 'icon',
    icon: 'icon-back',
    click: () => {
      history.push('/chat_list')
    }
  }

  const changeCheckedUsers = (name) => {
    const oldCheckedUsers = [...checkedUsers]
    checkedUsers.indexOf(name) >= 0 ? oldCheckedUsers.splice(checkedUsers.indexOf(name), 1) : oldCheckedUsers.push(name)
    setCheckedUsers(oldCheckedUsers)
  }

  return (
    <>
      <div className="create_group_top">
        <Title left={left} middle={'创建群聊'} right={{}}/>
        <img className="create_group_img" src={require('../../assets/image/群聊.png')} alt='群聊'/>
        <input type="text" className="create_group_name" placeholder='群名称' onClick={() => {setNameTextareaShow(true)}} value={nameTextarea} readOnly/>
      </div>
      <div className='create_group'>
        <div className="create_group_user_list">
          <p className="create_group_user_title">用户</p>
          {
            props.userList.length > 0 && props.userList.map((item, i) => {
              return (
                <div className="create_group_user_item" key={`${item.name}-${i}`}>
                  <div className="create_group_user_item_checkbox">
                    <input
                      type="checkbox"
                      id={'create_group_user_item_input' + i}
                      checked={checkedUsers.indexOf(item.name) >= 0}
                      onChange={() => {changeCheckedUsers(item.name)}}
                    />
                    <label htmlFor={'create_group_user_item_input' + i}></label>
                  </div>
                  <label htmlFor={'create_group_user_item_input' + i} className='create_group_user_item_right'>
                    <img src={item.url} alt="用户头像" className="create_group_user_icon"/>
                    <span className="create_group_user_name">{item.name}</span>
                  </label>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="create_group_bottom">
        <button
          className={checkedUsers.length > 0 ? 'create_group_bottom_button_active' : 'create_group_bottom_button' }
          disabled={!(checkedUsers.length > 0)}
        >{checkedUsers.length > 0 ? `创建(${checkedUsers.length})` : '创建'}</button>
      </div>
      <CSSTransition
        in={nameTextareaShow}
        timeout={500}
        classNames='group_name_textarea'
        unmountOnExit
      >
        <GroupNameTextarea
          setNameTextarea={setNameTextarea}
          setNameTextareaShow={setNameTextareaShow}
          nameTextarea={nameTextarea}
        />
      </CSSTransition>

    </>

  )
}

CreateGroup.propTypes = {
  getUserList: PropTypes.func,
  userList: PropTypes.array
}

export default connect(
  state => ({
    userList: state.userList
  }),
  {
    getUserList
  }
)(CreateGroup)
