import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import { PAGE_SIZE } from "../../utils/constants";
import { reqRoles, reqAddRole, reqUpdateRole } from '../../api'
import AddForm from './add-form'
import AuthForm from './auth-form'
import memoryUtils from "../../utils/memoryUtils"
import { formateDate } from '../../utils/dateUtils'
import storageUtils from "../../utils/storageUtils";

// 商品分类路由
export default class Role extends Component {

  state = {
    roles: [], // 所有角色的列表
    role: {}, //选中的role
    isShowAdd: false, // 是否显示添加
    isShowAuth: false,
  }

  constructor(props) {
    super(props)
    this.auth = React.createRef()
  }

  // 更新角色
  async updateRole() {
    const role = this.state.role
    // 得到新的menus
    const menus = this.auth.current.getMeuns()
    role.menus = menus
    role.auth_time = Date.now()
    role.auth_name = memoryUtils.user.username
    // 请求更新
    const result = await reqUpdateRole(role)
    if (result.status === 0) {
      // 隐藏确认框
      this.setState({
        isShowAuth: false
      })
      // 如果更新的是自己角色的权限, 强制退出
      if (role._id === memoryUtils.user.role_id) {
        message.success('当前用户角色权限修改了, 重新登录')
        memoryUtils.user = {}
        storageUtils.removeUser()
        this.props.history.replace('/login')
      } else {
        message.success('更新状态成功')
        this.setState({
          roles: [...this.state.roles]
        })
      }
    }
  }

  // 添加角色
  addRole() {
    // 进行表单验证
    this.form.validateFields(async (error, values) => {
      if (!error) {
        // 隐藏确认框
        this.setState({
          isShowAdd: true
        })
        // 收集输入数据
        const {roleName} = values
        this.form.resetFields()
        // 请求添加
        const result = await reqAddRole(roleName)
        // 根据结果提示/更新列表显示
        if (result.status === 0) {
          message.success('添加角色成功')
          const role = result.data
          // 更新role状态
          // const roles = this.state.roles // 不推荐
          // const roles = [...this.state.roles] // 不推荐
          // roles.push(roles)
          // this.setState({
          //   roles
          // })
          // 更新roles状态: 基于原本数据状态更新
          this.setState(state => ({
            roles: [...state.roles, role] // 推荐
          }))
        } else {
          message.error('添加角色失败')
        }
      }
  })
  }

  // 获取角色列表
  getRoles = async () => {
    const result = await reqRoles()
    if (result.status === 0) {
      const roles = result.data
      this.setState({
        roles
      })
    }
  }

  onRow(role) {
    return {
      onClick(event) {
        this.setState({
          role
        })
      }
    }
  }

  // table格式
  initColum = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: (create_time) => formateDate(create_time)
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: formateDate
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      }
    ]
  }

  componentWillMount() {
    this.initColum()
  }

  componentDidMount() {
    this.getRoles()
  }


  render () {

    const {roles, role, isShowAdd, isShowAuth} = this.state

    const title = (
      <span>
        <Button type='primary' onClick={() => this.setState({isShowAdd: true})}>创建角色</Button>
        <Button type='primary' disabled={!role._id} onClick={() => this.setState({isShowAuth: true})}>设置角色信息</Button>
      </span>

    )

    return (
      <Card title={title}>
        <Table
          bordered
          dataSource={roles}
          columns={this.columns}
          rowKey='_id'
          pagination={{
            defaultPageSize: PAGE_SIZE
          }}
          rowSelection={{type: 'radio', selectedRowKeys: [role._id], onSelect: (role) => {this.setState({role})}}}
          onRow={this.onRow}
        />
        <Modal
          title='添加角色'
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {this.setState({
            isShowAdd: false
          })
            this.form.resetFields()
          }}
        >
          <AddForm
            setForm={(form) => this.from = form}
          ></AddForm>
        </Modal>
        <Modal
          title='添加角色'
          visible={isShowAuth}
          onOk={this.addRole}
          onCancel={() => {this.setState({
            isShowAuth: false
          })
          }}
        >
          <AuthForm
            role = {role}
            ref = {this.auth}
          ></AuthForm>
        </Modal>
      </Card>
    )
  }
}