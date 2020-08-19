import React from 'react'
import { Button, Form, Select, Modal, Radio, message } from 'antd'
import Title from '@/components/title/title'
import dict from '@/util/dict'
import './index.scss'

const { Option } = Select

class UserTask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lists: [], // 可接任务列表 
      taskInfo: {}, // 选中某个任务的数据
      loading: false, // 刷新

      visible: false, // 选择平台账号浮层的显示与隐藏
      platform_id: 100001, // 平台账号id

      // 平台账号列表（根据平台类型，后端获取）
      platform_info: [{
        id: 100001,
        platform_name: '我的唯一'
      }, {
        id: 100002,
        platform_name: 'sdusdu'
      }],
    }
  }

  UNSAFE_componentWillMount() {
    // 获取可接任务列表
    let lists = []
    for (let i = 1; i <= 30; i++) {
      lists.push({
        task_id: 100000 + i,
        platform_head_thumb: 'http://www.ixiupet.com/uploads/allimg/190110/278-1Z110162K1R2.png',
        platform_type: Math.round(Math.random() * 3),
        task_num: 10,
        statusNum0: Math.round(Math.random() * 10),
        user_gold: 0.5
      })
    }
    this.setState({ lists })
  }

  // 搜索
  handleSubmit = (e) => {
    e.preventDefault()
  }

  // 刷新
  refresh = () => {
    this.setState({
      loading: true
    })
    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 1000)
  }

  // 隐藏选择平台账号浮层
  hidePlatformChoose = () => {
    this.setState({
      visible: false,
      platform_id: 100001
    })
  }

  // 显示选择平台账号浮层
  showPlatformChoose(val) {
    // console.log(val)
    this.setState({
      visible: true,
      taskInfo: val
    })
  }

  // 抢任务
  robTask = () => {
    // const { taskInfo, platform_id } = this.state
    // console.log(taskInfo, platform_id)

    message.success({
      content: '抢任务成功', duration: 1, onClose: () => {

      }
    })

    // 隐藏选择平台账号浮层
    this.hidePlatformChoose()
  }

  render() {
    const { lists, loading, visible, platform_id, platform_info } = this.state
    const { getFieldDecorator } = this.props.form
    return (
      <div className='usertask'>
        <Title title='可接任务' />

        <div className='usertask-search'>
          {/* 审核不通过时，选择审核不通过原因的浮层 */}
          <Modal className='modal-reason-style' width={300} title='请选择平台账号' visible={visible} onCancel={this.hidePlatformChoose} onOk={this.robTask} okText='抢任务'>
            <Radio.Group value={platform_id} onChange={(e) => { this.setState({ platform_id: e.target.value }) }}>
              {
                platform_info.map((item, index) => {
                  return <Radio value={item.id} key={index}>{item.platform_name}</Radio>
                })
              }
            </Radio.Group>
          </Modal>

          {/* 搜索 */}
          <Form layout='inline' onSubmit={this.handleSubmit}>
            <Form.Item label='活动平台类型'>
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
            <Form.Item>
              <Button type='primary' htmlType='submit'>搜索</Button>
            </Form.Item>
          </Form>

          <Button className='refresh' type='primary' icon='redo' loading={loading} onClick={this.refresh}>刷新</Button>
        </div>

        <div className='usertask-content'>
          {
            lists.length > 0 ?
              <div className='usertask-lists'>
                {
                  // 可接任务列表
                  lists.map((item, index) => {
                    return <div className='lists-item' key={index}>
                      <div className='lists-item-thumb'>
                        <img src={item.platform_head_thumb} alt='platform_head_thumb' />
                      </div>
                      <div className='lists-item-info'>
                        <ul>
                          <li><span>活动平台类型：</span><span>{dict.platform_dict[item.platform_type]}</span></li>
                          <li><span>剩余任务数：</span><span><span className='danger'>{item.statusNum0}</span>/{item.task_num}个</span></li>
                          <li><span>佣金：</span><span><span className='danger'>{item.user_gold}</span>金币</span></li>
                          <li style={{ textAlign: 'right' }}><Button type='primary' size='small' onClick={this.showPlatformChoose.bind(this, item)}>抢任务</Button></li>
                        </ul>
                      </div>
                    </div>
                  })
                }
              </div>
              :
              <div className='usertask-nodata'>很抱歉，平台任务已经被抢光了，请刷新任务！</div>
          }
        </div>




      </div>
    )
  }
}

const UserTaskForm = Form.create({})(UserTask)

export default UserTaskForm