import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'

import { reqLogin } from '../../api'

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
        // 请求登录
        // try {
        //   const response = await reqLogin(username, password)
        //   console.log('请求成功', response)
        // } catch(error) {
        //   console.log('请求出错了')
        // }
        const response = await reqLogin(username, password)
        console.log('请求成功', response)
      } else {
        console.log('校验失败!')
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className='login'>
        <header className='login-header'>
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className='login-content'>
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
export default WrapLogin