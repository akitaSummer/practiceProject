import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { getGroup, changeIgnore } from '../../redux/actions'
import Title from "../../components/Title/Title";
import InformationItem from "../../components/InformationItem/InformationItem";

import './GroupDetail.scss'

const GroupDetail = (props) => {

  const [deleteUser, setDeleteUser] = useState('')

  useEffect(() => {
    if (Object.keys(props.group).length === 0) {
      props.getGroup()
    }
    console.log(props.userList.filter(item => item.name === props.group.name)[0])
  }, [props])

  const history = useHistory()

  const left = {
    type: 'icon',
    icon: 'icon-back',
    click: () => {
      history.goBack()
    }
  }

  const right = {
    type: 'img',
    url: require('../../assets/image/more.png')
  }

  return (
    <>
      {
        Object.keys(props.group).length > 0 && props.userList.length > 0  ?
        (
          <div className = "group_detail" onClick={() => {setDeleteUser('')}}>
            <Title left = {left} middle = {''} right = {right}/>
            <img src={props.userList.filter(item => item.name === props.group.name)[0].url} alt="群头像" className="group_detail_background"/>
            <div className="group_detail_group_card">
              <p className="group_detail_group_card_title">
                <span className="group_detail_group_card_title_name">{props.group.name}</span>
                <span className="group_detail_group_card_title_middle"></span>
                <span className="group_detail_group_card_title_creare">{props.group.createTime}</span>
              </p>
              <p className="group_detail_group_card_index">
                {props.group.index}
              </p>
              <div className="group_detail_group_card_users">
                <p className="group_detail_group_card_users_title">
                  <span className="group_detail_group_card_users_name">群成员</span>
                  <span className="group_detail_group_card_users_middle"></span>
                  <span className="group_detail_group_card_users_admin">成员管理<i className='iconfont icon-right'/></span>
                </p>
                <div className="group_detail_group_card_users_items">
                  {
                    props.group.users.map((user, i) => {
                      return (
                        <div className="group_detail_group_card_users_item" key={i} onClick={(e) => {e.stopPropagation();setDeleteUser(user)}}>
                          <img src={props.userList.filter(item => item.name === user)[0].url} alt='成员头像' className="group_detail_group_card_users_item_img"/>
                          <span className="group_detail_group_card_users_item_name">{user}</span>
                          {
                            user === deleteUser ? <div className="group_detail_group_card_users_item_delete"><i className='iconfont icon-close'/></div> : ''
                          }
                        </div>
                      )
                    })
                  }
                  <div className="group_detail_group_card_users_item">
                    <div className="group_detail_group_card_users_item_img add"><i className="iconfont icon-increase"></i></div>
                    <span className="group_detail_group_card_users_item_name">邀请</span>
                  </div>
                </div>
              </div>
              <div className="group_detail_group_card_info">
                <InformationItem left={'群名称'} middle={{type: '', content: props.group.name}} right={'icon-right'}/>
                <InformationItem left={'群公告'} middle={{type: '', content: props.group.index}} right={'icon-right'}/>
                <InformationItem left={'群内名'} middle={{type: '', content: props.group.myName}} right={'icon-right'}/>
                <div className='information_item '>
                  <span className="information_item_left">消息免打扰</span>
                  <span className="information_item_middle_font"></span>
                  <span className="information_item_right group_detail_group_card_ignore">
                    <input type="checkbox" id='group_detail_group_card_ignore' checked={props.group.isIgnore} onChange={() => {props.changeIgnore()}}/>
                    <label htmlFor="group_detail_group_card_ignore"  className={props.group.isIgnore ? "active" : ""}>
                      <div className={props.group.isIgnore ? "group_detail_group_card_ignore_boot active" : "group_detail_group_card_ignore_boot"}></div>
                    </label>
                  </span>
                </div>
              </div>
              <button className="group_detail_group_card_leave">退出群聊</button>
            </div>
          </div>
          )
        : ''
      }
    </>
  )
}

GroupDetail.propTypes = {
  group: PropTypes.object,
  getUser: PropTypes.func,
  userList: PropTypes.array,
  changeIgnore: PropTypes.func,
}

export default connect(
  state => {
    return {
      group: state.group,
      userList: state.userList
    }
  },
  {
    getGroup,
    changeIgnore
  }
)(GroupDetail)
