import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUser } from '../../redux/actions'
import Title from "../../components/Title/Title"
import InformationItem from "../../components/InformationItem/InformationItem";
import './UserDetail.scss'

const UserDetail = (props) => {
  useEffect(() => {
    if (Object.keys(props.user).length === 0) {
      props.getUser()
    }
  }, [props])

  const history = useHistory()

  const left = {
    type: 'icon',
    icon: 'icon-back',
    click() {
      history.push("/chat_list");
    }
  }

  const right = {
    type: 'icon',
  }

  const itemName = {
    name: '名称',
    img: '头像',
    readme: '签名',
    signInTime: '注册',
    ni: '昵称',
    sex: '性别',
    birthday: '生日',
    tel: '电话',
    email: '邮箱',
    password: '密码'
  }


  return (
    <>
      <Title left={left} middle='详情' right={right}/>
      {Object.keys(props.user).length > 0 && <div className="user_detail">
        {
          Object.keys(props.user).map((item, i) => {
            if (item === 'img') {
              return <InformationItem key={i} left={itemName[item]} middle={{ type: 'img', url: props.user[item]}} right={'icon-right'}/>
            } else if (item === 'signInTime') {
              return <InformationItem key={i} left={itemName[item]} middle={{ type: 'type', content: props.user[item]}} right={'null'}/>
            } else if (item === 'password') {
              return <InformationItem key={i} left={itemName[item]} middle={{ type: 'password', content: props.user[item]}} right={'icon-right'}/>
            } else {
              return <InformationItem key={i} left={itemName[item]} middle={{ type: 'type', content: props.user[item]}} right={'icon-right'}/>
            }
          })
        }
      </div>}
      <button className="out_sign_in">退出登录</button>
    </>
  )
}

UserDetail.propType = {
  user: PropTypes.object,
  getUser: PropTypes.func
}

export default connect(
  state => {
    return {user: state.user}
  },
  {
    getUser
  }
)(UserDetail)
