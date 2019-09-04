import React, { Component } from 'react'
import {Card, Select, Input, Button, Icon, Table, Form} from 'antd'

import LinkButton from '../../components/link-button'

const Item = Form.Item
const Option = Select.Option
// Product的默认子路由组件
export default class ProductHome extends Component {

  state = {
    product: [], // 商品的数组
  }

  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => `$${price}`
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 100,
        render: (status) => {
          return (
            <span>
              <Button type='primary'>下架</Button>
              <span>在售</span>
            </span>
          )
        },
      },
      {
        title: '操作',
        width: 100,
        render: (product) => {
          return (
            <span>
              <LinkButton>详情</LinkButton>
              <LinkButton>修改</LinkButton>
            </span>
          )
        }
      },
    ]
  }

  componentWillMount() {
    this.initColumns()
  }

  render () {

    const {product} = this.state
    const {columns} = this

    const title = (
      <span>
        <Select value='1' style={{width: 150}}>
          <Option value='1'>按名称搜索</Option>
          <Option value='2'>按描述搜索</Option>
        </Select>
        <Input placeholder='关键字' style={{width: 150, margin: '0 15px'}}/>
        <Button type='primary'>搜索</Button>
      </span>
    )

    const extra = (
      <Button type='primary'>
        <Icon type='plus'/>
        添加商品
      </Button>
    )

    return (
      <div>
        <Card title={title} extra={extra}>
          <Table bordered dataSource={product} columns={columns} rowKey='_id'></Table>
        </Card>
      </div>
    )
  }
}