import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'

import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'

import { Layout } from 'antd';

const { Footer, Sider, Content } = Layout;

// 后台管理的路由组件
export default class Admin extends Component {
  render () {
    const user = memoryUtils.user
    if (!user || !user._id) {
      return <Redirect to='/login'/>
    }
    return (
        <Layout style={{height: '100%'}}>
          <Sider>
            <LeftNav/>
          </Sider>
          <Layout>
            <Header></Header>
            <Content style={{backgroundColor: '#fff'}}>Content</Content>
            <Footer style={{textAlign: 'center', color: '#ccc'}}>推荐使用谷歌浏览器, 可以获得更佳的页面操作体验</Footer>
          </Layout>
        </Layout>
    )
  }
}