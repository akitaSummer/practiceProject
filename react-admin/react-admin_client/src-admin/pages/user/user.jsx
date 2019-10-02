import React, { Component } from 'react'
import {Card, Modal, Table, Button, message} from "antd";
import {PAGE_SIZE} from "../../utils/constants";
import AddForm from "../role/add-form";
import AuthForm from "../role/auth-form";
import {formateDate} from "../../utils/dateUtils";
import LinkButton from "../../components/link-button";
import {reqDeleteUser, reqUsers, reqAddOrUpdateUser} from "../../api";
import UserForm from './user-form'

// 用户路由
export default class User extends Component {

  state = {
    users: [],
    isShow: false
  }

  initColumns() {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: (role_id) => this.roleName[role_id]
      },
      {
        title: '操作',
        render: (user) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
            <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
          </span>
        )
      },
    ]
  }

  // 显示修改界面
  showUpdate(user) {
    this.user = user
  }

  // 删除指定用户
  deleteUser(user) {
    Modal.confirm({
      title: `确认删除${user.username}吗?`,
      async onOk() {
        const result = await reqDeleteUser(user._id)
        if (result.status === 0) {
          message.success('删除用户成功')
          this.getUsers()
        }
      }
    })
  }

  async getUsers() {
    const result = await reqUsers()
    if (result.status === 0) {
      const {users, roles} = result.data
      this.initRoleNames(roles)
      this.setState({
        users,
        roles
      })
    }
  }

  inirRoleNames(roles) {
    const roleName = roles.reduce((pre, role) => {
      pre[role._id] = role.name
      return pre
    }, {})
    this.roleName = roleName
  }

  // 更新/添加用户
  async addOrUpdateUser() {
    this.setState({isShow: false})
    // 收集输入数据
    const user = this.form.getFieldsValue()
    this.form.resetFields()
    // 如果是更新, 需要给user指定_id属性
    if (this.user) {
      user._id = this.user._id
    }
    // 提交添加的请求
    const result = await reqAddOrUpdateUser(user)
    if (result.status === 0) {
      message.success((this.user ? '修改' : '添加')+'用户成功')
      this.getUsers()
    }
  }

  // 显示添加界面
  showAdd() {
    this.user = null
    this.setState({isShow: true})
  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getUsers()
  }

  render () {

    const {users, role, isShow} = this.state
    const user = this.user || {}

    const title = (
      <Button type='primary' onClick={this.showAdd}>创建用户</Button>
    )

    return (
      <Card title={title}>
        <Table
          bordered
          dataSource={users}
          columns={this.columns}
          rowKey='_id'
          pagination={{
            defaultPageSize: PAGE_SIZE
          }}
        />
        <Modal
          title={user._id ? '修改用户' : '添加用户'}
          visible={isShow}
          onOk={this.addOrUpdate}
          onCancel={() => {
            this.form.resetFields()
            this.setState({
            isShow: false
          })
          }}
        >
          <UserForm setForm={(form) => this.form = form} role={role} user={user}></UserForm>
        </Modal>
      </Card>
    )
  }
}