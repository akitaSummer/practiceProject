import React, { Component } from 'react'
import { Card, Form, Input, Cascader, Upload, Button, Icon } from 'antd'

import LinkButton from '../../components'
import { reqCategorys } from '../../api'

const { Item } = Form
const { TextArea } = Input

// Product的添加和更新的子路由
class ProductAddUpdate extends Component {

  state = {
    options: []
  }

  initOptions = (categorys) => {
    // 根据categorys生成options数组
    const options = categorys.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false, // 不是叶子
    }))
    // 更新options状态
    this.setState({
      options,
    })
  }

  // 获取一级/二级分类列表
  getCategorys = async (parentId) => {
    const result = await reqCategorys(parentId) // {status: 0, data:categorys }
    if (result.status === 0) {
      const categorys = result.data
      // 如果是一级分类列表
      if (parentId === '0') {
        this.initOptions(categorys)
      } else {
        // 二级列表
        return categorys // 返回二级列表
      }
    }
  }

  // 用于加载下一级列表的回调函数
  loadData = async selectedOptions => {
    // 得到选择的对象
    const targetOption = selectedOptions[0]
    // loading效果
    targetOption.loading = true
    // 根据选中的分类获取二级分类列表
    const subCategorys = await this.getCategorys(targetOption.value)
    // 隐藏loading
    targetOption.loading = false
    if (subCategorys && subCategorys.length > 0) {
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
      // 关联到当前option上
      targetOption.children = childOptions
    } else {
      targetOption.isLeaf = true
    }
    this.setState({
      options: [...this.state.options]
    })
  }

  // 验证价格的自定义函数
  validatePrice = (rule, value, callback) => {
    if (value*1 > 0) {
      callback()
    } else {
      callback('价格必须大于1')
    }
  }

  submit = () => {
    // 进行表单验证, 如果通过了, 发送请求
    this.props.form.validateFields((error, values) => {
      if (!error) {
        alert('发送ajax请求')
      }
    })
  }

  componentDidMount() {
    this.getCategorys()
  }

  render () {
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: {span: 2}, // 左侧label的宽度
      wrapperCol: {span: 8}, // 指定右侧包裹的宽度
    }
    const title = (
      <span>
        <LinkButton>
          <Icon type='arrow-left' style={{fontSize: 20}}></Icon>
        </LinkButton>
      </span>
    )

    const {getFieldDecorator} = this.props.form

    return (
      <div>
        <Card title={title}>
          <Form {...formItemLayout}>
            <Item label='商品名称'>
              {
                getFieldDecorator('name', {
                  initialValue: '',
                  rules: [
                    {required: true, message: '必须输入商品名称'}
                  ]
                })(<Input palaceholder='商品名称'/>)
              }
            </Item>
            <Item label='商品描述'>
              {
                getFieldDecorator('desc', {
                  initialValue: '',
                  rules: [
                    {required: true, message: '必须输入商品描述'}
                  ]
                })(<TextArea palaceholder='商品名称' autosize={{minRows: 2, maxRows: 6}}/>)
              }
            </Item>
            <Item label='商品价格'>
              {
                getFieldDecorator('price', {
                  initialValue: '',
                  rules: [
                    {required: true, message: '必须输入商品名称'},
                    {validator: this.validatePrice}
                  ]
                })(<Input type='number' palaceholder='商品价格' addonAfter='元'/>)
              }
            </Item>
            <Item label='商品分类'>
              <Cascader
                options={this.state.options}
                loadData={this.loadData}
              />
            </Item>
            <Item label='商品图片'>
              <div></div>
            </Item>
            <Item label='商品详情'>
              <div></div>
            </Item>
            <Item>
              <Button type='primary' onClick={this.submit}>提交</Button>
            </Item>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create()(ProductAddUpdate)