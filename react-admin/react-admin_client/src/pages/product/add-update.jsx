import React, { Component } from 'react'
import { Card, Form, Input, Cascader, Upload, Button, Icon } from 'antd'

import LinkButton from '../../components'

const { Item } = Form
const { TextArea } = Input

// Product的添加和更新的子路由
class ProductAddUpdate extends Component {

  state = {}

  // 用于加载下一级列表的回调函数
  loadData = selectedOptions => {
    // 得到选择的对象
    const targetOption = selectedOptions[0]
    // loading效果
    targetOption.loading = true
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