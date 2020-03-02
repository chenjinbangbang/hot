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

class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

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
            <Button style={{ marginLeft: 10 }} type='danger' size='small' onClick={this.outLine.bind(this, record.id, record.attention_time)}>违规</Button>
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
        attention_time: Math.round(Math.random() * 4),

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
  }

  // 提交表单 - 点击搜索
  handleSubmit = e => {
    e.preventDefault()
    console.log(this.props.form.getFieldsValue())
  }

  // 任务违规
  outLine(id, attention_time) {
    Modal.confirm({
      content: <p>编号为<span className='danger'>{id}</span>的任务关注保留时间是<span className='danger'>{dict.attention_time_dict[attention_time]}</span>，创作者抽查到刷手在该时间内取消关注，扣除<span className='danger'>{attention_time + 1}金币</span></p>,
      onOk: () => {
        message.success(`违规操作成功`)
      }
    })
  }

  // 表格分页
  changePage = (page) => {
    this.setState({ current: page })
  }

  render() {
    const { columns, data, current } = this.state
    const { getFieldDecorator } = this.props.form
    return (
      <div className='task'>
        <Title title='任务管理' />

        <div className='tasklist-stat'>
          <p>
            总任务数：<span className='danger'>20</span>个，
            创作者发布金币数：<span className='danger'>200</span>金币，
            刷手赚取金币数：<span className='danger'>200</span>金币，
            平台赚取金币数：<span className='danger'>20</span>金币
          </p>
          <p>
            未开始：<span className='danger' onClick={this.searchStatus.bind(this, 0)}>4</span>个，
            进行中：<span className='danger' onClick={this.searchStatus.bind(this, 1)}>4</span>个，
            待审核：<span className='danger' onClick={this.searchStatus.bind(this, 2)}>4</span>个，
            审核通过：<span className='danger' onClick={this.searchStatus.bind(this, 3)}>4</span>个，
            审核不通过：<span className='danger' onClick={this.searchStatus.bind(this, 4)}>4</span>个，
            违规：<span className='danger' onClick={this.searchStatus.bind(this, 6)}>10</span>个，
            已取消：<span className='danger' onClick={this.searchStatus.bind(this, 5)}>10</span>个，
            </p>
        </div>

        {/* 搜索 */}
        <Form layout='inline' onSubmit={this.handleSubmit}>
          <Form.Item label='任务编号'>
            {
              getFieldDecorator('id', {
                initialValue: ''
              })(
                <Input />
              )
            }
          </Form.Item>
          <Form.Item label='发布方'>
            {
              getFieldDecorator('username', {
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
          <Form.Item label='发布平台账号'>
            {
              getFieldDecorator('platform_name', {
                initialValue: ''
              })(
                <Input />
              )
            }
          </Form.Item>
          <Form.Item label='接手平台账号'>
            {
              getFieldDecorator('taskover_platform_name', {
                initialValue: ''
              })(
                <Input />
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
                      return <Option value={index} key={index}>{item}</Option>
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

const TaskForm = Form.create({})(Task)

export default TaskForm;