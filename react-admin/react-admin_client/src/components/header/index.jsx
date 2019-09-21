import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd';

import LinkButton from '../link-button'
import { formateDate } from "../../utils/dateUtils"
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import menuList from '../../config/menuConfig'
import { reqWeather } from "../../api"

import './index.less'

// 头部导航的组件
class Header extends Component {

  state = {
    currentTime: formateDate(Date.now()), // 当前时间字符串
    dayPictureUrl: '', // 天气图片的url
    weather: '', // 天气的文本
  }

  getTime = () => {
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({currentTime})
    },1000)
  }

  getWeather = async () => {
    const {dayPictureUrl, weather} = await reqWeather('武汉')
    this.setState({dayPictureUrl, weather})
  }

  getTitle = () => {
    const path = this.props.location.pathname
    let title
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        const cItem = item.children.find(cItem =>  path.indexOf(cItem.key) === 0)
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }

  logout = () => {
    Modal.confirm({
      title: '确认退出吗',
      onOk: () => {
        storageUtils.removeUser()
        memoryUtils.user = {}
        this.props.history.replace('/login')
      }
    })
  }

  // 在第一次render后执行, 一般在此执行异步操作(如发ajax/请求定时器)
  componentDidMount() {
    // 获取当前时间
    this.getTime()
    // 获取当前天气
    this.getWeather()
  }

  // 当前组件卸载之前调用
  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  render () {

    const {currentTime, dayPictureUrl, weather} = this.state
    const {username} = memoryUtils.user
    const title = this.getTitle()

    return (
      <div className='header'>
        <div className="header-top">
          <span>欢迎, {username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt=""/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)