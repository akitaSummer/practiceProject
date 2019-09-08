import React, { Component } from 'react'
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table,
  Form,
  message
} from 'antd'

import LinkButton from '../../components/link-button'
import { reqProducts, reqSearchProducts, reqUpdateStatus } from "../../api"
import { PAGE_SIZE } from '../../utils/constants'

const Item = Form.Item
const Option = Select.Option
// Product的默认子路由组件
export default class ProductHome extends Component {

  state = {
    total: 0, // 商品的总数量
    product: [], // 商品的数组
    loading: false, // 是否正在加载中
    searchName: '', // 搜索的关键字
    searchType: 'productName', // 根据那个字段搜索
  }

  // 初始化table的列的数组
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
        //dataIndex: 'status',
        width: 100,
        render: (product) => {
          const {status, _id} = product
          return (
            <span>
              <Button
                type='primary'
                onClick={() => this.updateStatus(_id, status === 1 ? 2 : 1)}
              >{status === 1 ? '下架' : '上架'}</Button>
              <span>{status === 1 ? '在售' : '已下架'}</span>
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
              {/*将product对象传递给目标路由组件*/}
              <LinkButton onClick={() => this.props.history.push('/product/detail', {product})}>详情</LinkButton>
              <LinkButton>修改</LinkButton>
            </span>
          )
        }
      },
    ]
  }

  // 获取指定页码的列表数据显示
  getProducts = async (pageNum) => {
    this.pageNum = pageNum // 保存pageNum让其他方法看见
    this.setState({loading: true}) // 显示loading
    const {searchName, searchType} = this.state
    let result
    if (searchName) {// 如果关键字有值, 说明进行搜索分页
      result = await reqSearchProducts({pageNum, pageSize: PAGE_SIZE, searchName, searchType})
    } else { // 一般分页
      result = await reqProducts(pageNum, PAGE_SIZE)
    }
    this.setState({loading: false}) // 隐藏loading
    if (result.status === 0) {
      // 取出分页数据, 更新状态, 显示列表
      const {total, list} = result.data
      this.setState({
        total,
        products: list
      })
    }
  }

  // 更新指定商品的状态
  updateStatus =  async (productId, status) => {
    const result = await reqUpdateStatus(productId, status)
    if (result.status === 0) {
      message.success('更新商品成功')
      this.getProducts(this.pageNum)
    }
  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getProducts(1)
  }

  render () {

    const {total, product, loading, searchName, searchType} = this.state
    const {columns} = this

    const title = (
      <span>
        <Select value={searchName} style={{width: 150}} onChange={value => this.setState({searchType: value})}>
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input placeholder='关键字' style={{width: 150, margin: '0 15px'}} value={searchName} onChange={event => this.setState({searchName: event.target.value})}/>
        <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
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
          <Table
            bordered
            loading={loading}
            dataSource={product}
            columns={columns}
            rowKey='_id'
            pagination={{
              total,
              defaultPageSize: PAGE_SIZE,
              showQuickJumper: true,
              onChange: this.getProducts
            }}
          ></Table>
        </Card>
      </div>
    )
  }
}