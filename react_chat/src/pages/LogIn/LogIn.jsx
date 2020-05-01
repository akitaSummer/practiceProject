import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import Title from "../../components/Title/Title";
import './LogIn.scss'

const Login = () => {

  const [login, setLogin] = useState({ name: '', password: '' })
  const [signUp, setSignUp] = useState({ name: '', email: '', password: '' })
  const [sign, setSign] = useState(true)

  const history = useHistory()

  const left = {
    type: 'icon',
    icon: 'icon-back',
    click: () => {
      history.goBack()
    }
  }

  const right = {
    type: 'content',
    content: sign ? '注册' : '取消',
    click: () => {
      setSign(!sign)
    }
  }

  return (
    <div className={'log_in'}>
      <Title right={right} middle={null} left={left}/>
      <img src={require('../../assets/image/火.png')} alt="img" className="log_in_img"/>
      <CSSTransition
        in={sign}
        timeout={500}
        classNames='sign'
        unmountOnExit
      >
        <div className='log_in_content'>
          <p className="log_in_title">登录</p>
          <p className="log_in_hello">您好，欢迎来到 yike！</p>
          <input
            type="text"
            className="log_in_input"
            placeholder='用户名'
            value={login.name}
            onChange={(e) => {setLogin({...login, name: e.target.value})}}
          />
          <input
            type="password"
            className="log_in_input"
            placeholder='密码'
            value={login.password}
            onChange={(e) => {setLogin({...login, password: e.target.value})}}
          />
          <button className={(login.name.length > 0 && login.password.length > 0) ? "log_in_button" : "log_in_button disabled"} disabled={!(login.name.length > 0 && login.password.length > 0)}>登录</button>
        </div>

      </CSSTransition>
      <CSSTransition
        in={!sign}
        timeout={500}
        classNames='sign'
        unmountOnExit
      >
        <div className='log_in_content'>
          <p className="log_in_title">注册</p>
          <input
            type="text"
            className="log_in_input"
            placeholder='请取个名字'
            value={signUp.name}
            onChange={(e) => {setSignUp({...signUp, name: e.target.value})}}
          />
          <input
            type="type"
            className="log_in_input"
            placeholder='请输入邮箱'
            value={signUp.email}
            onChange={(e) => {setSignUp({...signUp, email: e.target.value})}}
          />
          <input
            type="password"
            className="log_in_input"
            placeholder='请输入密码'
            value={signUp.password}
            onChange={(e) => {setSignUp({...signUp, password: e.target.value})}}
          />
          <button className={(signUp.name.length > 0 && signUp.password.length > 0 && signUp.email.length > 0) ? "log_in_button" : "log_in_button disabled"} disabled={!(signUp.name.length > 0 && signUp.password.length > 0 && signUp.email.length > 0)}>注册</button>
        </div>

      </CSSTransition>
    </div>
  )
}

export default Login
