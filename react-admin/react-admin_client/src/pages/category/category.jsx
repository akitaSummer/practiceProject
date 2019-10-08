import React, { Component } from 'react'
import { Card, Table, Button, Icon, message, Modal } from 'antd'

import LinkButton from '../../components/link-button'
import {reqAddCategory, reqCategorys, reqUpdateCategorys} from '../../api'
import AddForm from './add-form'
import UpdateForm from './update-form'

// 商品分类路由
export default class Category extends Component {

  state = {
    loading: false,
    categorys: [], // 一级分类列表
    subCategorys: [], // 子分类列表
    parentId: '0', // 当前需要显示的分类列表的父分类id
    parentName: '', // 当前需要显示的分类列表的父分类名称
    showStatus: 0, // 标识添加更新的确认框是否显示, 0: 都不显示, 1: 显示添加, 2: 显示更新
  }

  // 初始化Table所有列的数组
  initColumns = () => {
    return [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: (category) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
            {this.state.parentId === '0'? <LinkButton onClick={() => {this.showSubCategorys(category)}}>查看子分类</LinkButton> : null}
          </span>
        ),
      }
    ]
  }

  // 异步获取一级/二级分类列表显示
  getCategorys = async (parentId) => {
    this.setState({loading: true})
    parentId = parentId || this.state.parentId
    const result = await reqCategorys(parentId)
    this.setState({loading: false})
    if (result.status === 0) {
      const categorys = result.data
      if (parentId === '0') {
        // 更新一级列表
        this.setState({categorys})
      } else {
        // 更新二级列表
        this.setState({subCategorys: categorys})
      }
    } else {
      message.error('获取分类列表失败')
    }
  }

  // 显示指定一级分类对象的二级子列表
  showSubCategorys = async (category) => {
    // setState是异步执行状态
    // this.setState({
    //   parentId: category._id,
    //   parentName: category.name,
    // }, () => {
    //   this.getCategorys()
    // })
    await this.setState({
      parentId: category._id,
      parentName: category.name,
    })
    this.getCategorys()
  }

  // 显示一级分类列表
  showCategorys = (category) => {
    this.category = category
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: [],
    })
  }

  // 响应点击取消: 隐藏确定框
  handleCancel = () => {
    this.form.resetFields()
    this.setState({
      showStatus: 0
    })
  }

  // 显示添加的确认框
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }

  // 显示修改的确认框
  showUpdate = (category) => {
    this.category = category
    this.setState({
      showStatus: 2
    })
  }

  // 添加分类
  addCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          showStatus: 0
        })
        const {parentId, categoryName} = this.form.getFieldsValue()
        // 清除输入数据
        this.form.resetFields()
        const result = await reqAddCategory(categoryName, parentId)
        if (result.status === 0) {
          if (parentId === this.state.parentId) {
            this.getCategorys()
          } else if (parentId === '0') {
            // 在二级分类列表下添加一级列表, 但不需要显示一级列表
            this.getCategorys('0')
          }
        }
      }
    })
  }

  // 更新分类
  updateCategory = () => {
    // 表单验证通过才处理
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          showStatus: 0
        })

        // 准备数据
        const categoryId = this.category._id
        const {categoryName} = values
        // 清除输入数据
        this.form.resetFields()

        const result = await reqUpdateCategorys({categoryId, categoryName})
        if (result.status === 0) {
          this.getCategorys()
        }
      }
    })
  }

  // 为第一次render准备数据
  componentWillMount() {
    this.columns = this.initColumns()
  }

  // 执行异步ajax请求
  componentDidMount() {
    // 更新一级列表
    this.getCategorys()
  }

  render () {
    const {categorys, loading, parentId, parentName, subCategorys, showStatus} = this.state
    const category = this.category || {} // 初始时没有this.category
    // card的左侧
    const title = parentId === '0' ? '一级分类列表' : (
      <span>
        <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
        <Icon type='arrow-right' style={{marginRight: 5}}/>
        <span>{parentName}</span>
      </span>
    )
    // card的右侧
    const extra = (<Button type='primary' onClick={this.showAdd}>
      <Icon type='plus'/>
      添加
    </Button>)

    return (
      <Card title={title} extra={extra}>
        <Table
          loading={loading}
          pagination={{defaultPageSize: 5, showQuickJumper: true}}
          bordered
          columns={this.columns}
          dataSource={parentId === '0'? categorys : subCategorys}
          rowKey="_id"
        />
        <Modal
          title='添加分类'
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <span><AddForm categorys={categorys} parentId={parentId} setForm={(form) => {this.form = form}}/></span>
        </Modal>
        <Modal
          title='更新分类'
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <span><UpdateForm categoryName={category.name} setForm={(form) => {this.form = form}}/></span>
        </Modal>
      </Card>
    )
  }
}