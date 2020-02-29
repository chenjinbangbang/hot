import React from 'react'
import './index.scss'
import { Steps, Button, Input, message } from 'antd'
import Title from '@/components/title/title'
import UploadImg from '@/components/uploadimg/uploadimg'
import Countdown from '@/components/countdown/countdown'
import dict from '@/util/dict'

import userImg from '@/assets/imgs/user.jpg'

const { Step } = Steps

// 任务状态的样式
let task_dict_class = {
  0: '',
  1: 'danger',
  2: 'warning',
  3: 'success',
  4: 'danger'
}

class UserTaskList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 0, // 步骤条索引
      platformVal: '', // 发布平台账号
      checkPlatformVal: false, // 验证发布平台账号是否通过
      // 任务详情
      detail: {
        id: 100000 + 1,
        task_img1: 'http://www.ixiupet.com/uploads/allimg/190110/278-1Z110162K1R2.png',
        task_img2: 'http://www.ixiupet.com/uploads/allimg/190110/278-1Z110162K1R2.png',
        platform_type: Math.round(Math.random() * 3),
        username: '我的唯一',
        task_entry: 0,
        platform_id: 100000 + 1,
        platform_name: 's**u',
        create_time: '2020-10-10 10:10:10',
        user_gold: 0.5,
        complete_countdown_time: Math.round(Math.random() * 5),
        remark: '你一定要预览够时间哦，你一定要预览够时间哦，你一定要预览够时间哦，你一定要预览够时间哦，你一定要预览够时间哦',
        attention_time: Math.round(Math.random() * 4),
        status: Math.round(Math.random() * 4),
        preview_countdown_time: 5,
      },
    }

    // console.log(this.props)
  }

  UNSAFE_componentWillMount() {

    // 脱敏处理
    // let a = '我的唯一';
    // let firstVal = a.substr(0, 1)
    // let lastVal = a.substr(-1, 1)
    // console.log(firstVal + '*'.repeat(a.length - 2) + lastVal)
  }

  // 改变步骤条状态
  onChangeStep = () => {
    this.setState(state => ({
      currentStep: state.currentStep + 1
    }))
  }

  // 验证发布平台账号
  checkPlatform = () => {
    const { platformVal } = this.state
    if (!platformVal) {
      return message.warning('请输入发布平台账号')
    }
    this.setState({
      checkPlatformVal: true
    })
  }

  render() {
    const { currentStep, platformVal, checkPlatformVal, detail } = this.state
    return (
      <div className='user-taskdetail'>
        <Title title='任务详情' />

        <div className='user-taskdetail-step'>
          <Steps current={currentStep}>
            <Step title="进行中" />
            <Step title="预览中" />
            <Step title="待审核" />
            <Step title="已完成" />
            <Step title="审核不通过" />
          </Steps>
          {/* <Button type='primary' onClick={this.onChangeStep}>下一步</Button> */}
        </div>


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
            <div className='taskdetail-cancel'>
              {/* <p>规定任务完成时间倒计时：</p>
              <p>{dict.complete_countdown_time_dict[detail.complete_countdown_time]}分钟</p>
              <p>（必须在该时间内完成，否则将自动放弃任务）</p> */}
              <p>提示：必须在 <span className='danger'><Countdown time={dict.complete_countdown_time_dict[detail.complete_countdown_time] * 60} /></span> 内完成，否则将自动放弃任务</p>
            </div>
            <ul>
              <li><p>任务编号：</p><p>{detail.id}</p></li>
              <li><p>发布方：</p><p>{detail.username}</p></li>
              <li><p>活动平台：</p><p>{dict.platform_dict[detail.platform_type]}</p></li>
              <li><p>发布平台账号：</p><p className='danger'>{detail.platform_name}</p></li>
              <li><p>活动入口：</p><p className='danger'>{detail.task_entry === 0 && '搜索账号进入'}</p></li>
              {/* <li><p>任务发布时间：</p><p>{detail.create_time}</p></li> */}
              <li><p>佣金：</p><p><span className='danger'>{detail.user_gold}</span>金币</p></li>

              {/* <li><p>规定任务完成时间：</p><p><span className='danger'>{dict.complete_countdown_time_dict[detail.complete_countdown_time]}</span>分钟<span className='danger'>（必须在该时间内完成，否则将自动放弃任务）</span></p></li> */}
              <li style={{ width: '100%', lineHeight: '22px', alignItems: 'flex-start' }}>
                <p>关注保留时间：</p>
                <p>
                  <span className='danger'>{dict.attention_time_dict[detail.attention_time]}</span>
                  <span className='fontColor1'>
                    （关注必须保留<span className='danger'>{dict.attention_time_dict[detail.attention_time]}</span>，创作者可在<span className='danger'>{dict.attention_time_dict[detail.attention_time]}</span>内随机抽查刷手是否取消关注。若<span className='danger'>{dict.attention_time_dict[detail.attention_time]}</span>内查不到该刷手，则扣除<span className='danger'>{detail.attention_time + 1}金币</span>给创作者，并记录一次违规）
                    </span>
                </p>
              </li>
              <li style={{ width: '100%', lineHeight: '22px', alignItems: 'flex-start' }}><p>任务备注：</p><p className='fontColor1'>{detail.remark}</p></li>

              {/* 任务要求 */}
              <li><p>任务要求：</p><p className='danger'>关注，点赞，{detail.platform_type === 0 && '收藏，'}评论</p></li>
              <li>
                <p>核对发布平台账号：</p>
                {
                  checkPlatformVal ?
                    <p><span className='danger'>{platformVal}</span> <span style={{ marginLeft: '10px' }} className='fontColor1'>核对正确</span></p>
                    :
                    <React.Fragment>
                      <Input placeholder='请输入发布平台账号' value={platformVal} onInput={(e) => { this.setState({ platformVal: e.target.value }) }} />
                      <Button style={{ marginLeft: '10px' }} type='dashed' onClick={this.checkPlatform}>验证</Button>
                    </React.Fragment>
                }
              </li>
              <li><p>预览倒计时：</p><p><Countdown time={detail.preview_countdown_time} type={1} onChange={(val) => {
                this.setState(state => ({
                  detail: { ...state.detail, preview_countdown_time: val }
                }))
              }} />秒<span className='danger'>（必须预览够60秒，才能够提交任务）</span></p></li>
              <li><Button type='primary' disabled={detail.preview_countdown_time > 0}>提交任务</Button></li>
            </ul >
          </div >
        </div >
      </div>
    )
  }
}

export default UserTaskList