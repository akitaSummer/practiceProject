import React, {Component, memo} from 'react'
import { Card, Form, Input, Cascader, Upload, Button, Icon, message } from 'antd'

import PictureWall from './pictures-wall'
import RichTextEditor from './rich-text-editor'
import LinkButton from '../../components'
import { reqCategorys, reqAddOrUpdateProduct } from '../../api'
import memoryUtils from "../../utils/memoryUtils";

const { Item } = Form
const { TextArea } = Input

// Product的添加和更新的子路由
class ProductAddUpdate extends Component {

  state = {
    options: []
  }

  constructor(props) {
    super(props)
    // 创建用来保存ref标识的标签对象的容器
    this.pw = React.createRef()
    this.editor = React.createRef()
  }

  initOptions = async (categorys) => {
    // 根据categorys生成options数组
    const options = categorys.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false, // 不是叶子
    }))

    // 如果是一个二级分类商品的更新
    const {isUpdate, product} = this
    const {pCategoryId, categoryId} = product
    if (isUpdate && pCategoryId !== 0) {
      // 获取对应的二级分类列表
      const subCategorys = await this.getCategorys(pCategoryId)
      // 生成二级下拉列表的options
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
      // 关联到对应的一级option上
      const targetOption = options.find(option => option.value === pCategoryId)
      targetOption.children = childOptions
    }

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
    this.props.form.validateFields( async (error, values) => {
      if (!error) {
        // 收集数据封装成product对象
        const {name, desc, price, categoryIds} = values
        let pCategoryId, categoryId
        if (categoryIds.length === 1) {
          pCategoryId = 0
          categoryId = categoryIds[0]
        } else {
          pCategoryId = categoryIds[0]
          categoryId = categoryIds[1]
        }
        const imgs = this.pw.current.getImgs()
        const detail = this.editor.current.getDetail()
        const product = {name, desc, price, categoryId, pCategoryId, imgs, detail}
        if (this.isUpdate) {
          product._id = this.product._id
        }
        // 调用接口请求函数去添加/更新
        const result = await reqAddOrUpdateProduct(product)
        // 根据结果提示
        if (result.status === 0) {
          message.success(`${this.isUpdate ? '更新' : '新建'}商品成功!`)
          this.props.history.goBack()
        } else {
          message.error(`${this.isUpdate ? '更新' : '新建'}商品失败!`)
        }
        alert('发送ajax请求')
      }
    })
  }

  componentWillMount() {
    // 取出携带的state
    // const product = this.props.location.state // 如果是添加则没值, 否则有值
    const product = memoryUtils.product // 如果是添加则没值, 否则有值
    // 保存是否是更新的标识
    this.isUpdate = !!product._id
    // 保存商品, 如果没有则为空对象
    this.product = product || {}
  }

  componentDidMount() {
    this.getCategorys()
  }

  componentWillUnmount() {
    // 卸载之前清除保存数据
    memoryUtils.product = {}
  }

  render () {
    const {isUpdate, product} = this
    const {pCategoryId, categoryId, imgs, detail} = product
    // 用来接收级联分类ID的数组
    const categoryIds = []
    if (isUpdate) {
      categoryIds.push(pCategoryId)
      if (pCategoryId !== '0') {
        categoryIds.push(categoryId)
      }
    }
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: {span: 2}, // 左侧label的宽度
      wrapperCol: {span: 8}, // 指定右侧包裹的宽度
    }
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type='arrow-left' style={{fontSize: 20}}></Icon>
        </LinkButton>
        <span>{isUpdate ? '修改商品' : '添加商品'}</span>
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
                  initialValue: product.name,
                  rules: [
                    {required: true, message: '必须输入商品名称'}
                  ]
                })(<Input palaceholder='商品名称'/>)
              }
            </Item>
            <Item label='商品描述'>
              {
                getFieldDecorator('desc', {
                  initialValue: product.desc,
                  rules: [
                    {required: true, message: '必须输入商品描述'}
                  ]
                })(<TextArea palaceholder='商品名称' autosize={{minRows: 2, maxRows: 6}}/>)
              }
            </Item>
            <Item label='商品价格'>
              {
                getFieldDecorator('price', {
                  initialValue: product.price,
                  rules: [
                    {required: true, message: '必须输入商品名称'},
                    {validator: this.validatePrice}
                  ]
                })(<Input type='number' palaceholder='商品价格' addonAfter='元'/>)
              }
            </Item>
            <Item label='商品分类'>
              {
                getFieldDecorator('categoryIds', {
                  initialValue: categoryIds,
                  rules: [
                    {required: true, message: '必须指定商品分类'}
                  ]
                })(<Cascader
                  placeholder='请指定商品分类'
                  options={this.state.options}
                  loadData={this.loadData}
                />)
              }
            </Item>
            <Item label='商品图片'>
              <PictureWall ref={this.pw} imgs={imgs}/>
            </Item>
            <Item label='商品详情' labelCol={{span : 2}} wrapperCol={{span : 20}}>
              <RichTextEditor ref={this.editor} detail={detail}/>
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

// 子组件调用父组件的方法: 将父组件的方法以函数属性的形式传递给子组件, 子组件就可以调用
// 父组件调用子组件的方法: 在父组件中, 通过ref得到子组件标签对象