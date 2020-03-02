import React from 'react'
import './index.scss'
// import { Link } from 'react-router-dom'
import { Form, Table, Select, Button, Modal, message, Input } from 'antd'
import Title from '@/components/title/title'
import dict from '@/util/dict'

let { Option } = Select

// 任务状态的样式
let task_dict_class = {
  0: '',
  1: 'danger',
  2: 'warning',
  3: 'success',
  4: 'danger'
}


class UserTasklist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 平台账号列表（根据平台类型，后端获取）
      platform_info: [{
        id: 100001,
        platform_name: '我的唯一'
      }, {
        id: 100002,
        platform_name: 'sdusdu'
      }],

      current: 1, // 当前页
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          key: 'index',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '任务编号',
          dataIndex: 'id',
          key: 'id',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '任务信息',
          dataIndex: 'taskInfo',
          key: 'taskInfo',
          align: 'center',
          render: (text, record) => <div className='tasklist-table'>
            <p>发布方：{record.username}</p>
            <p>活动平台：{dict.platform_dict[record.platform_type]}</p>
            <p>发布平台账号：{record.platform_name}</p>
            <p>佣金：<span className='danger'>{record.user_gold}</span>金币</p>
            <p>发布时间：{record.create_time}</p>
          </div >
        },
        {
          title: '接手状态',
          dataIndex: 'status',
          key: 'status',
          align: 'center',
          render: (text, record) => <div className='tasklist-table'>
            <p>状态：<span className={task_dict_class[text]}>{dict.task_dict[text]}</span></p>
            <p>接手平台账号：{record.taskover_platform}</p>
            <p>接手时间：{record.takeover_time}</p>
            {
              record.status === 3 &&
              <p className='success'>完成时间：{record.complete_time}</p>
            }
          </div>
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          align: 'center',
          render: (text, record) => <div>
            <Button type='link' size='small' onClick={() => { this.props.history.push({ pathname: '/home/user/taskdetail', state: { id: record.id } }) }}>查看详情</Button>
          </div>
        }
      ],
      data: []
    }

    // console.log(this.props)
  }

  UNSAFE_componentWillMount() {

    // 获取财务明细数据
    let data = []
    for (let i = 1; i <= 30; i++) {
      data.push({
        key: i,
        index: i,
        id: 100000 + i,
        username: '我的唯一',
        platform_type: Math.round(Math.random() * 3),
        platform_id: 100000 + i,
        platform_name: '我的唯一',
        user_gold: 0.5,
        create_time: '2019-12-22 22:22:10',

        taskover_user_id: 100000 + i,
        taskover_platform: 'sdusdu',
        takeover_time: '2019-12-22 22:22:10',
        complete_time: '2019-12-22 22:22:10',
        status: Math.round(Math.random() * 4),
      })
    }
    this.setState({ data })
  }

  // 根据任务状态搜索
  searchStatus(status) {
    // 设置一组输入控件的值
    this.props.form.setFieldsValue({ status })

    // 设置一组输入控件的值与错误状态
    // this.props.form.setFields({
    //   status: {
    //     value: status,
    //     errors: [new Error('xxx')]
    //   }
    // })
  }

  // 提交表单 - 点击搜索
  handleSubmit = e => {
    e.preventDefault()
    console.log(this.props.form.getFieldsValue())
  }

  // 取消任务
  cancelTask(task_id, statusNum0) {
    Modal.confirm({
      content: <p>只能取消未开始的任务，不能取消进行中，待审核，审核通过的任务。未开始的任务有<span className='danger'>{statusNum0}</span>个，是否取消？？</p>,
      width: 450,
      onOk: () => {
        message.success('取消任务成功')
      }
    })
  }

  // 表格分页
  changePage = (page) => {
    this.setState({ current: page })
  }

  render() {
    const { platform_info, columns, data, current } = this.state
    const { getFieldDecorator } = this.props.form
    return (
      <div className='user-tasklist'>
        <Title title='任务列表' />

        <div className='tasklist-stat'>
          <p>已接任务数：<span className='danger'>20</span>个，赚取金币数：<span className='danger link'>200</span>金币</p>
          <p>
            进行中：<span className='danger' onClick={this.searchStatus.bind(this, 1)}>4</span>个，
            待审核：<span className='danger' onClick={this.searchStatus.bind(this, 2)}>4</span>个，
            审核通过：<span className='danger' onClick={this.searchStatus.bind(this, 3)}>4</span>个，
            审核不通过：<span className='danger' onClick={this.searchStatus.bind(this, 4)}>4</span>个，
            违规：<span className='danger' onClick={this.searchStatus.bind(this, 5)}>4</span>个
            </p>
        </div>

        {/* 搜索 */}
        <Form layout='inline' onSubmit={this.handleSubmit}>
          <Form.Item label='发布方'>
            {
              getFieldDecorator('username', {
                initialValue: ''
              })(
                <Input />
              )
            }
          </Form.Item>
          <Form.Item label='发布平台账号'>
            {
              getFieldDecorator('platform_name', {
                initialValue: ''
              })(
                <Input />
              )
            }
          </Form.Item>
          <Form.Item label='平台类型'>
            {
              getFieldDecorator('platform_type', {
                initialValue: ''
              })(
                <Select style={{ width: 150 }}>
                  <Option value=''>全部</Option>
                  {
                    Object.values(dict.platform_dict).map((item, index) => {
                      return <Option value={index} key={index}>{item}</Option>
                    })
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label='平台账号'>
            {
              getFieldDecorator('takeover_platform_id', {
                initialValue: ''
              })(
                <Select style={{ width: 150 }}>
                  <Option value=''>全部</Option>
                  {
                    platform_info.map((item, index) => {
                      return <Option value={item.id} key={index}>{item.platform_name}</Option>
                    })
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label='任务状态'>
            {
              getFieldDecorator('status', {
                initialValue: ''
              })(
                <Select style={{ width: 150 }}>
                  <Option value=''>全部</Option>
                  {
                    Object.values(dict.task_dict).map((item, index) => {
                      return (
                        (index !== 0 && index !== 6) ?
                          <Option value={index} key={index}>{item}</Option>
                          :
                          null
                      )
                    })
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>搜索</Button>
          </Form.Item>
        </Form>

        <Table columns={columns} dataSource={data} pagination={{ current, showQuickJumper: true, onChange: this.changePage }}></Table>

      </div>
    )
  }
}

const UserTasklistForm = Form.create({
  // mapPropsToFields: (props) => {
  //   console.log(props)
  // },
  // name: 'xxx',
  // onFieldsChange: (props, changedFields, allFields) => {
  //   console.log(props, changedFields, allFields)
  // }
})(UserTasklist)

export default UserTasklistForm;