import React, { Component } from 'react'
import { Form, Tree, Input } from 'antd'
import PropTypes from 'prop-types'
import menuList from '../../config/menuConfig'

const Item = Form.Item
const { TreeNode } = Tree
// 添加分类的form组件
export default class AuthForm extends Component {

  static propTypes = {
    role: PropTypes.object, // 用来传递form对象的函数
  }

  constructor(props) {
    super(props)
    const {menus} = this.props.role
    this.state = {
      checkedKeys: menus
    }
  }

  // 为父组件提交获取最新menus数据的方法
  getMenus() {
    return this.state.checkedKeys
  }

  // 选中某个node时的回调
  onCheck = checkedKeys => {
    this.setState({checkedKeys})
  }

  getTreeNodes(menuList) {
    return menuList.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      )
      return pre
    }, [])
  }

  componentWillMount() {
    this.treeNodes = this.getTreeNodes(menuList)
  }

  // 根据新传入的role来更新checkedKeys状态
  componentWillReceiveProps(nextProps) {
    const menus = nextProps.role.menus
    this.setState({
      checkedKey: menus
    })
  }

  render () {
    const { role } = this.props
    const { checkedKeys } = this.state
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: {span: 2}, // 左侧label的宽度
      wrapperCol: {span: 8} // 右侧包裹的宽度
    }
    return (
      <Form>
        <Item label='角色名称' {...formItemLayout}>
          <Input value={role.name} disabled/>
        </Item>
        <Tree
          checkable
          defaultExpandAll={true}
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
        >
          <TreeNode title='平台权限' key='all'>
            {this.treeNodes}
          </TreeNode>
        </Tree>
      </Form>
    )
  }
}
