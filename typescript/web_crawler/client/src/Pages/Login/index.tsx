import React, { useState, useEffect } from 'react'
import request from '../../request'
import { Form, Input, Button, message } from 'antd';
import { useHistory } from 'react-router-dom'
import { LockOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import qs from 'qs'
import './style.css'

const LoginForm = () => {

  const [isLogin, setIsLogin] = useState(false)

  const history = useHistory()

  const onFinish = async (values: Store) => {
    const result: undefined | { data: boolean } = await request.post('/api/login', qs.stringify({
      password: values.password
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    if (result?.data) {
      setIsLogin(true)
    } else {
      message.error('登陆失败', 10)
    }
  };

  useEffect(() => {
    if (isLogin) {
      history.replace('/')
    }
  }, [isLogin, history])

  return (
    <div className="login-page">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >

        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入你的密码' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm
