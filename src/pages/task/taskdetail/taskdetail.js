import React from 'react'
import './index.scss'
// import { Link } from 'react-router-dom'
import { Form, Table, Select, Button, Modal, message, Tooltip, Input, Icon, Radio, Checkbox } from 'antd'
import Title from '@/components/title/title'
import UploadImg from '@/components/uploadimg/uploadimg'
import Countdown from '@/components/countdown/countdown'
import dict from '@/util/dict'

import userImg from '@/assets/imgs/user.jpg'

let { Option } = Select

// 任务状态的样式
let task_dict_class = {
  0: '',
  1: 'danger',
  2: 'warning',
  3: 'success',
  4: 'danger'
}

class TaskDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 平台账号列表（根据平台类型，后端获取）
      // platform_info: [{
      //   id: 100001,
      //   platform_name: '我的唯一'
      // }, {
      //   id: 100002,
      //   platform_name: 'sdusdu'
      //   }],

      // 任务详情
      detail: {
        task_img1: 'http://www.ixiupet.com/uploads/allimg/190110/278-1Z110162K1R2.png',
        task_img2: 'http://www.ixiupet.com/uploads/allimg/190110/278-1Z110162K1R2.png',
        platform_type: Math.round(Math.random() * 3),
        username: '我的唯一',
        task_entry: 0,
        create_time: '2020-10-10 10:10:10',
        task_num: 10,
        remark: '你一定要预览够时间哦，你一定要预览够时间哦，你一定要预览够时间哦，你一定要预览够时间哦，你一定要预览够时间哦',
        attention_time: Math.round(Math.random() * 4),
        status: Math.round(Math.random() * 4),
        cancel_num: 4,
        statusNum0: 2,
        statusNum1: 2,
        statusNum2: 2,
        statusNum3: 4
      },

      // 某个任务的数据
      taskInfo: {
        status_reason: [], // 审核不通过的原因
        status_reason_imgs: [], // 审核不通过图片
      },

      status_reasonVisible: false,  // 审核不通过的原因浮层的显示与隐藏
      status_reasonDetail: false, // 审核不通过的原因浮层，是否是详情

      // selectedRowKeys: [], // 表格选中项
      current: 1, // 当前页
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          // key: 'index',
          align: 'center',
          width: 70,
          render: text => <span>{text}</span>
        },
        {
          title: '任务编号',
          dataIndex: 'id',
          key: 'id',
          align: 'center',
          width: 100,
          render: (text) => <span>{text}</span>
        },

        {
          title: '任务信息',
          dataIndex: 'taskinfo',
          // key: 'taskinfo',
          align: 'center',
          width: 210,
          render: (text, record) => <div className='tasklist-table'>
            {/* <p><span>任务状态：</span><span className={task_dict_class[record.status]}>{dict.task_dict[record.status]}</span></p> */}
            <Tooltip placement='top' title={record.comment_content}>
              {/* <p><span>编号：</span><span>{record.id}</span></p> */}
              <p><span>评价内容：</span><span className='ellipsis primary'>{record.comment_content || '无'}</span></p>
            </Tooltip>
            <p><span>是否转发：</span><span>{record.transpond === 1 ? '是' : '否'}</span></p>
            {
              record.transpond === 1 &&
              <React.Fragment>
                <p><span>转发类型：</span><span>{dict.share_dict_toutiao[record.transpond_type]}</span></p>
                <Tooltip placement='top' title={record.transpond_content}>
                  <p><span>转发内容：</span><span className='ellipsis primary'>{record.transpond_content || ''}</span></p>
                </Tooltip>
              </React.Fragment>
            }
          </div>
        },

        {
          title: '接手状态',
          dataIndex: 'taskover_status',
          // key: 'taskover_status',
          align: 'center',
          width: 270,
          render: (text, record) => <div className='tasklist-table1'>
            {
              record.status !== 0 &&
              <React.Fragment>
                <p><span>接手用户名：</span><span className='danger'>{record.taskover_username}</span></p>
                <p><span>接手账号：</span><span>{record.taskover_platform}</span></p>
                <p><span>接手QQ号：</span><span>{record.taskover_qq}</span></p>
                <p><span>接手时间：</span><span>{record.takeover_time}</span></p>

                {
                  record.status === 3 &&
                  <p className='success'><span>完成时间：</span><span>{record.complete_time}</span></p>
                }
              </React.Fragment>
            }
          </div >
        },

        {
          title: '任务状态',
          dataIndex: 'status',
          // key: 'status',
          align: 'center',
          width: 290,
          render: (text, record) => <div className='tasklist-table1'>
            <p><span></span><span className={task_dict_class[text]}>{dict.task_dict[text]}</span></p>
            {
              // 待审核时显示
              record.status === 2 &&
              <p className='danger'>
                <span>审核倒计时：</span>
                <Countdown time={record.countdown_time} />
                <Tooltip placement='top' title='若在该时间未操作，平台将自动审核通过'>
                  <Icon type="question-circle" />
                </Tooltip>
              </p>
            }
            {
              // 审核不通过时显示
              record.status === 4 &&
              <p><Button className='status-btn' type='primary' size='small' onClick={this.showCheckStatus.bind(this, record, 1)}>审核详情</Button></p>
            }
          </div >
        },
        {
          title: '操作',
          dataIndex: 'operation',
          // key: 'operation',
          align: 'center',
          width: 150,
          render: (text, record) => <div style={{ textAlign: 'left' }}>
            {
              // 任务状态为待审核时，审核不通过时显示
              (record.status === 2 || record.status === 4) &&
              <React.Fragment>
                <Tooltip placement='top' title='若审核通过，说明任务已完成，状态不可再更改，请谨慎操作'>
                  <Button type="primary" size='small' onClick={this.checkConfirm.bind(this, record.id)}>通过</Button>
                </Tooltip>
                {
                  // 任务状态为审核不通过时不显示
                  record.status !== 4 &&
                  <Button type="danger" size='small' style={{ marginLeft: 10 }} onClick={this.showCheckStatus.bind(this, record, 0)}>不通过</Button>
                }
              </React.Fragment>
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
        key: 100000 + i,
        index: i,
        id: 100000 + i,

        comment_content: '真的要评论，告诉所有人你的存在，这是必须的，相信我',
        transpond: Math.round(Math.random()),
        transpond_type: Math.round(Math.random() * 3),
        transpond_content: '你一定要转发哦，这个是很好看的，不要辜负我对你的期望，拜托了',

        taskover_username: '我的唯一',
        taskover_platform: 'sdusdu',
        taskover_qq: '905690338',
        takeover_time: '2019-12-22 22:22:10',
        countdown_time: Math.round(Math.random() * 24) * 60 * 60,
        complete_time: '2019-12-22 22:22:10',

        status_reason: [1],
        status_reason_imgs: ['http://www.ixiupet.com/uploads/allimg/190110/278-1Z110162K1R2.png'],

        status: Math.round(Math.random() * 4),
      })
    }
    this.setState({ data })
  }

  // 任务审核不通过原因浮层的隐藏
  hideCheckStatus = () => {
    this.setState(state => ({
      status_reasonVisible: false,
    }), () => {
      setTimeout(() => {
        this.setState(state => ({
          taskInfo: { ...state.taskInfo, status_reason: [], status_reason_imgs: [] }
        }))
      }, 500)
    })
  }

  // 任务审核不通过原因浮层的显示（type：0：操作，1：详情）
  showCheckStatus(record, type) {
    this.setState({
      taskInfo: record,
      status_reasonVisible: true,
      status_reasonDetail: type === 1
    })
  }

  // 任务审核通过
  checkConfirm(id) {
    console.log(id)
    message.success('审核已通过')
  }

  // 任务审核不通过
  checkCancel = () => {
    const { taskInfo, status_reasonDetail } = this.state
    // console.log(taskInfo)

    // 是详情时，则不操作
    if (status_reasonDetail) {
      // 任务审核不通过原因浮层的隐藏
      this.hideCheckStatus()
      return
    }

    message.warning('审核不通过')

    // 任务审核不通过原因浮层的隐藏
    this.hideCheckStatus()
  }

  // 审核不通过图片，支持多张图片
  taskImageFileUpload = (src) => {
    this.setState(state => ({
      taskInfo: { ...state.taskInfo, status_reason_imgs: src }
    }))
  }

  // 批量任务审核不通过原因浮层的显示
  // showCheckStatusBatch(record) {
  //   this.setState({
  //     taskInfo: record,
  //     status_reasonVisible: true
  //   })
  // }

  // // 批量任务审核通过
  // checkConfirmBatch(id) {
  //   console.log(id)
  //   message.success('审核已通过')
  // }

  // // 批量任务审核不通过
  // checkCancelBatch = () => {
  //   // const { taskInfo, status_reason } = this.state
  //   // console.log(taskInfo, status_reason)
  //   message.warning('审核不通过')
  //   this.setState({
  //     status_reasonVisible: false,
  //     status_reason: '' // 审核不通过的原因初始化
  //   })
  // }

  // 提交表单 - 点击搜索
  handleSubmit = e => {
    e.preventDefault();

    console.log(this.props.form.getFieldsValue())
  }

  // 表格分页
  changePage = (page) => {
    this.setState({ current: page })
  }

  // 表格选择
  // onSelectChange = (selectedRowKeys, selectedRows) => {
  //   console.log(selectedRowKeys, selectedRows)
  //   this.setState({
  //     selectedRowKeys
  //   })
  // }

  render() {
    const {
      detail,
      taskInfo, status_reasonVisible, status_reasonDetail,
      columns, data, current
    } = this.state
    const { getFieldDecorator } = this.props.form

    return (
      <div className='taskdetail'>
        <Title title='任务详情' />

        {/* 审核不通过时，填写审核不通过原因的浮层 */}
        <Modal className='modal-reason-style' width={550} title={`${status_reasonDetail ? '' : '请填写'}审核不通过的原因`} visible={status_reasonVisible} onCancel={this.hideCheckStatus} onOk={this.checkCancel}>
          <div>{status_reasonDetail ? '' : '请选择'}审核不通过的原因：<span className='danger'>{status_reasonDetail ? '' : '（可多选）'}</span></div>
          <Checkbox.Group value={taskInfo.status_reason} onChange={(checkedValue) => { !status_reasonDetail && this.setState(state => ({ taskInfo: { ...state.taskInfo, status_reason: checkedValue } })) }}>
            {
              Object.values(dict.task_status_reason_dict).map((item, index) => {
                // 平台类型为今日头条，则没有收藏选项
                if (detail.platform_type === 0 && index === 2) {
                  return null
                } else {
                  return <Checkbox value={index} key={index} disabled={status_reasonDetail && !taskInfo.status_reason.includes(index)}>{item}</Checkbox>
                }
              })
            }
          </Checkbox.Group>

          <div className='modal-reason-label'>{status_reasonDetail ? '' : '请上传'}审核截图：<span className='danger'>{status_reasonDetail ? '' : '（最多上传3张图片）'}</span></div>
          {
            // 不是详情，或者图片数量大于0时显示
            !status_reasonDetail || taskInfo.status_reason_imgs.length > 0 ?
              <UploadImg isDetail={status_reasonDetail} img_src={taskInfo.status_reason_imgs} fileUpload={this.taskImageFileUpload.bind(this)} multiple={true} size={3}></UploadImg>
              :
              '无'
          }

        </Modal>

        <div className='taskdetail-info'>
          <div className='taskdetail-info-left'>
            <div className='taskdetail-img'>
              <p>任务截图1</p>
              <UploadImg isDetail={true} img_src={detail.task_img1 || userImg} ></UploadImg>
            </div>
            <div className='taskdetail-img'>
              <p>任务截图2</p>
              <UploadImg isDetail={true} img_src={detail.task_img2 || userImg} ></UploadImg>
            </div>
          </div>
          <div className='taskdetail-info-right'>
            {
              detail.status === 4 &&
              <div className='taskdetail-cancel'>任务已取消，禁止刷手接任务，已取消{detail.cancel_num}个任务</div>
            }
            <ul>
              <li><p>活动平台：</p><p>{dict.platform_dict[detail.platform_type]}</p></li>
              <li><p>平台账号：</p><p>{detail.username}</p></li>
              <li><p>活动入口：</p><p>{detail.task_entry === 0 && '搜索账号进入'}</p></li>
              <li><p>任务发布时间：</p><p>{detail.create_time}</p></li>
              <li><p>任务发布数：</p><p><span className='danger'>{detail.task_num}</span>个</p></li>
              <li><p>任务要求：</p><p className='danger'>关注，点赞，{detail.platform_type === 0 && '收藏，'}评论</p></li>
              <li style={{ width: '100%', lineHeight: '22px' }}>
                <p>关注保留时间：</p>
                <p>
                  {dict.attention_time_dict[detail.attention_time]}
                  <span className='danger'>（若刷手在该时间内取消关注，则可联系平台客服进行投诉，投诉成功即可返回{detail.attention_time + 1}金币赔偿，该赔偿由刷手承担。若存在恶意投诉行为，将冻结创作者账号一个月，并扣除10金币）</span>
                </p>
              </li>
              <li style={{ width: '100%', lineHeight: '22px' }}><p>任务备注：</p><p>{detail.remark}</p></li>
              <li className='taskdetail-status' style={{ width: '100%' }}>
                <span>未开始：<span className='danger'>{detail.statusNum0}</span>个</span>
                <span>进行中：<span className='danger'>{detail.statusNum1}</span>个</span>
                <span>待审核：<span className='danger'>{detail.statusNum2}</span>个</span>
                <span>审核通过：<span className='danger'>{detail.statusNum3}</span>个</span >
              </li >
            </ul >
          </div >
        </div >

        {/* 搜索 */}
        < Form layout='inline' onSubmit={this.handleSubmit} >
          <Form.Item label='是否转发'>
            {
              getFieldDecorator('transpond', {
                initialValue: ''
              })(
                <Select style={{ width: 150 }}>
                  <Option value=''>全部</Option>
                  <Option value={1}>是</Option>
                  <Option value={0}>否</Option>
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
        </Form >

        {/* <div className='taskdetail-batch'>
          <Button type='primary' onClick={this.checkConfirmBatch}>批量通过</Button>
          <Button type='danger' onClick={this.showCheckStatusBatch}>批量不通过</Button>
        </div> */}

        < Table
          columns={columns}
          dataSource={data}
          pagination={{ current, showQuickJumper: true, onChange: this.changePage }
          }
          size='small'
        // rowSelection={{ selectedRowKeys, onChange: this.onSelectChange }}
        // expandedRowRender={record => <div className='tasklist-table'>
        //   <p>评论内容：{record.comment_content || '无'}</p>
        //   <p>是否转发：{record.transpond === 1 ? '是' : '否'}</p>
        //   {
        //     record.transpond === 1 &&
        //     <React.Fragment>
        //       <p>转发类型：{dict.share_dict_toutiao[record.transpond_type]}</p>
        //       <p>转发内容：{record.transpond_content}</p>
        //     </React.Fragment>
        //   }
        // </div>}
        ></Table >

      </div >
    )
  }
}

const TaskDetailForm = Form.create({})(TaskDetail)

export default TaskDetailForm;