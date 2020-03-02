import React from 'react'
import './index.scss'
// import { Link } from 'react-router-dom'
import { Form, Table, Select, DatePicker, Button, Modal, message } from 'antd'
import Title from '@/components/title/title'
import dict from '@/util/dict'

let { Option } = Select
let { RangePicker } = DatePicker

class Tasklist extends React.Component {
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
          title: '任务信息',
          dataIndex: 'taskInfo',
          key: 'taskInfo',
          align: 'center',
          render: (text, record) => <div className='tasklist-table'>
            <p>平台类型：{dict.platform_dict[record.platform_type]}</p>
            <p>平台账号：{record.platform_name}</p>
            <p>金币数：<span className='danger'>{record.gold}</span>金币</p>
            {
              record.status === 5 &&
              <p>
                <span className='danger'>任务已取消</span>
                <span style={{ marginLeft: '10px' }}>已取消：<span className='danger'>{record.statusNum5}</span></span>
              </p>
            }
          </div >
        },
        {
          title: '任务状态',
          dataIndex: 'status',
          key: 'status',
          align: 'center',
          render: (text, record) => <div className='tasklist-table'>
            <p>任务数：<span className='danger'>{record.task_num}</span></p>
            <p>
              <span>未开始：<span className='danger'>{record.statusNum0}</span></span>
              <span style={{ marginLeft: '10px' }}> 进行中：<span className='danger'>{record.statusNum1}</span></span>
            </p >
            <p>
              <span>待审核：<span className='danger'>{record.statusNum2}</span></span>
              <span style={{ marginLeft: '10px' }}> 审核通过：<span className='danger'>{record.statusNum3}</span></span >
            </p>
            <p>
              <span>审核不通过：<span className='danger'>{record.statusNum4}</span></span>
            </p>
          </div>
        },
        {
          title: '发布时间',
          dataIndex: 'create_time',
          key: 'create_time',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          align: 'center',
          render: (text, record) => <div style={{ textAlign: 'left' }}>
            <Button type='primary' size='small' className='success-btn' onClick={() => { this.props.history.push({ pathname: '/home/task/detail', state: { task_id: record.task_id } }) }}>详情</Button>
            {
              // 未开始任务数为0时，并且是未取消状态时，隐藏取消任务按钮
              (record.statusNum0 !== 0 && record.status !== 5) &&
              <Button type='danger' size='small' style={{ marginLeft: 10 }} onClick={this.cancelTask.bind(this, record.task_id, record.statusNum0)}>取消</Button>
            }
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
        task_id: 100000 + i,
        platform_type: Math.round(Math.random() * 3),
        platform_id: Math.round(Math.random() * 1),
        platform_name: 'sudsdus',
        gold: 100,
        status: Math.round(Math.random() * 5),
        task_num: 10,
        statusNum0: 4,
        statusNum1: 2,
        statusNum2: 2,
        statusNum3: 2,
        statusNum4: 2,
        statusNum5: 10,
        create_time: '2019-12-22 22:22:10',
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
      <div className='tasklist'>
        <Title title='任务列表' />

        <div className='tasklist-stat'>
          <p>发布任务数：<span className='danger'>20</span>个，发布金币数：<span className='danger'>200</span>金币</p>
          <p>
            未开始：<span className='danger' onClick={this.searchStatus.bind(this, 0)}>4</span>个，
            进行中：<span className='danger' onClick={this.searchStatus.bind(this, 1)}>4</span>个，
            待审核：<span className='danger' onClick={this.searchStatus.bind(this, 2)}>4</span>个，
            审核通过：<span className='danger' onClick={this.searchStatus.bind(this, 3)}>4</span>个，
            审核不通过：<span className='danger' onClick={this.searchStatus.bind(this, 4)}>4</span>个，
            违规：<span className='danger' onClick={this.searchStatus.bind(this, 5)}>10</span>个，
            已取消：<span className='danger' onClick={this.searchStatus.bind(this, 6)}>10</span>个
            </p>
        </div>

        {/* 搜索 */}
        <Form layout='inline' onSubmit={this.handleSubmit}>
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
              getFieldDecorator('platform_id', {
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
          <Form.Item label='发布时间'>
            {
              getFieldDecorator('create_time', {
                // initialValue: [moment('2015/01/01', 'YYYY/MM/DD'), moment('2015/01/02', 'YYYY/MM/DD')]
              })(
                <RangePicker format='YYYY/MM/DD'></RangePicker>
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

const TasklistForm = Form.create({})(Tasklist)

export default TasklistForm;