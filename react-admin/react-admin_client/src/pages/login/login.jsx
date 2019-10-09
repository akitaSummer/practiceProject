import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import memoryUtils from '../../utils/memoryUtils'
import { login } from '../../redux/actions'

import './login.less'

// 登录的路由组件
class Login extends Component {

  // 自定义验证
  vaildatePwd = (rule, value, callback) => {
    if (!value) {
      callback('密码必须输入')
    } else if (value.length < 4) {
      callback('密码长度不能小于4')
    } else if (value.length > 12) {
      callback('密码长度不能大于12')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成')
    } else {
      callback()
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const {username, password} = values
        // 调用分发异步action的函数
        this.props.login(username, password)
      } else {
        console.log('校验失败!')
      }
    })
  }

  render () {

    // 如果已经登录, 自动跳转
    const user = this.props.user
    if (user && user._id) {
      return <Redirect to='/home'/>
    }

    const errorMsg = this.props.user.errorMsg

    const { getFieldDecorator } = this.props.form
    return (
      <div className='login'>
        <header className='login-header'>
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className='login-content'>
          <div className={user.errorMsg ? 'error-msg show' : 'error-msg'}>{errorMsg}</div>
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', { // 配置对象: 属性名是特定的一些名称
                // 声明式验证: 直接使用别人定义好的验证规则进行验证
                rules: [
                  {require: true, message: '用户名必须输入'},
                  {min: 4, message: '用户名至少四位'},
                  {max: 12, message: '用户名最多12位'},
                  {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成'}
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  rules: [
                    {
                      validator: this.validatePwd
                    }
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

const WrapLogin = Form.create()(Login)
export default connect(
  state => ({user: state.user}),
  {login}
)(WrapLogin)