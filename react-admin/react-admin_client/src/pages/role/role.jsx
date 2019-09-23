import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import { PAGE_SIZE } from "../../utils/constants";
import { reqRoles, reqAddRole } from '../../api'
import AddForm from './add-form'

// 商品分类路由
export default class Role extends Component {

  state = {
    roles: [], // 所有角色的列表
    role: {}, //选中的role
    isShowAdd: false, // 是否显示添加
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
        dataIndex: 'create_time'
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time'
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

    const {roles, role, isShowAdd} = this.state

    const title = (
      <span>
        <Button type='primary' onClick={() => this.setState({isShowAdd: true})}>创建角色</Button>
        <Button type='primary' disabled={!role._id}>设置角色信息</Button>
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
          rowSelection={{type: 'radio', selectedRowKeys: [role._id]}}
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
      </Card>
    )
  }
}