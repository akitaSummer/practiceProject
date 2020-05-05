import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, message } from 'antd'
import ReactEcharts from 'echarts-for-react'
import request from '../../request'
import moment from 'moment'
import './style.css'

type resultData<T> = undefined | { data: T }

const Home: React.FC = () => {

  const [, setIsLogin] = useState(true)
  const [isLoad, setIsLoad] = useState(true)
  const [data, setData] = useState<responseResult.DataStructure>({})

  const history = useHistory()

  const handleLogout = async () => {
    const result: resultData<responseResult.logout> = await request.get('/api/logout')
    if (result?.data) {
      setIsLogin(false)
      history.replace('/login')
    }
  }

  const handleCrowllerClick = async () => {
    const result: resultData<responseResult.getData> = await request.get('/api/getData')
    if (result?.data) {
      message.success('爬取成功')
    } else {
      message.success('爬取失败')
    }
  }

  const getOption = (): echarts.EChartOption => {
    const courseNames: string[] = []
    const times: string[] = []
    const tempData: {
      [key: string]: number[]
    } = {}
    for (let i in data) {
      const item = data[i]
      times.push(moment(Number(i)).format('MM-DD HH:mm'))
      item.forEach(innerItem => {
        const { title, count } = innerItem
        if (courseNames.indexOf(title) === -1) {
          courseNames.push(title)
        }
        tempData[title] ? tempData[title].push(innerItem.count) : (tempData[title] = [count])
      })
    }
    const result: echarts.EChartOption.Series[] = []
    for (let i in tempData) {
      result.push({
        name: i,
        type: 'line',
        data: tempData[i]
      })
    }
    return {
      title: {
        text: '课程在线学习人数'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: courseNames
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: times
      },
      yAxis: {
        type: 'value'
      },
      series: result
    };
  }

  useEffect(() => {
    const getData = async () => {
      const result: resultData<responseResult.isLogin> = await request.get('/api/isLogin')
      setIsLoad(false)
      if (!result?.data) {
        setIsLogin(false)
        history.replace('/login')
      }
      const classDataStr: string = await request.get('/api/showData')
      const classData: responseResult.showData = JSON.parse(classDataStr)
      if (classData) {
        setData(classData as responseResult.DataStructure)
      }
    }
    getData()
  }, [history])

  return (
    <>
      {
        isLoad ? null : (
          <div className='home-page'>
            <div className="buttons">
              <Button type="primary" style={{ marginRight: '25px'}} onClick={handleCrowllerClick}>爬取</Button>
              <Button type="primary" onClick={handleLogout}>退出</Button>
            </div>
            <ReactEcharts option={getOption()}/>
          </div>
        )
      }
    </>
  )
}

export default Home
