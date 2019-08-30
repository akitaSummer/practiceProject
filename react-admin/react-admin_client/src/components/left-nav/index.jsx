import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'

import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
import './index.less'

const { SubMenu } = Menu;

// 左侧导航的组件
class LeftNav extends Component {

  // 根据menu的数据数组生成对应的数组, 使用map
  getMenuNodes_map = (menuList) => {
    const path = this.props.location.pathname
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        // 查找一个与当前请求路径匹配的子Item
        // 查找一个与当前请求路径匹配的子Item
        const cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          this.openKey = item.key
        }
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }

  // 根据menu的数据数组生成对应的数组, 使用reduce
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname
    return menuList.reduce((pre, item) => {
      if (!item.children) {
        // 向pre中添加 <Menu.Item>
        pre.push((
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        ))
      } else {
        // 查找一个与当前请求路径匹配的子Item
        const cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          this.openKey = item.key
        }
        // 向pre中添加<SubMenu>
        pre.push((
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        ))
      }
      return pre
    }, [])
  }

  // 在第一次render()之前执行一次
  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList)
  }

  render () {
    // 得到当前路由请求的路径
    const path = this.props.location.pathname
    const openKey = this.openKey
    return (
      <div>
        <Link to='/' className='left-nav'>
          <header className='left-nav-header'>
            <img src={logo} alt="logo"/>
            <h1>硅谷后台</h1>
          </header>
        </Link>
        <div style={{ width: 200 }}>
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[path]}
            defaultOpenKeys={[openKey]}
          >
            {
              this.menuNodes
            }
          </Menu>
        </div>
      </div>
    )
  }
}

// withRouter高阶组件: 向非路由组件传递三个属性: history/location/match
export default withRouter(LeftNav)