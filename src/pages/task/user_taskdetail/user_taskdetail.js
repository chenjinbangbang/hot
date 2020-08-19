import React from 'react'
import './index.scss'
import { Steps, Button, Input, message, Modal } from 'antd'
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

// 任务审核倒计时
let countdown_time = 24 * 60 * 60

class UserTaskList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // currentStep: 0, // 步骤条索引
      platformVal: '', // 发布平台账号
      checkPlatformVal: false, // 验证发布平台账号是否通过
      preview_countdown_time: 60, // 任务预览倒计时
      // 任务详情
      detail: {
        id: 100000 + 1,
        // status: Math.round(Math.random() * 3 + 1),
        status: 1,
        // countdown_time: 24 * 60 * 60,
        status_reason: [1, 3, 4],
        status_reason_imgs: ['http://www.ixiupet.com/uploads/allimg/190110/278-1Z110162K1R2.png'],

        task_img1: 'http://www.ixiupet.com/uploads/allimg/190110/278-1Z110162K1R2.png',
        task_img2: 'http://www.ixiupet.com/uploads/allimg/190110/278-1Z110162K1R2.png',
        platform_type: Math.round(Math.random() * 3),
        username: '我的唯一',
        task_entry: 0,
        platform_id: 100000 + 1,
        platform_name: 's**u',
        create_time: '2020-10-10 10:10:10',
        user_gold: 0.5,
        taskover_user_id: 100000 + 1,
        taskover_platform: '哈哈哈你好',
        complete_countdown_time: Math.round(Math.random() * 5),
        remark: '你一定要预览够时间哦，你一定要预览够时间哦，你一定要预览够时间哦，你一定要预览够时间哦，你一定要预览够时间哦',
        attention_time: Math.round(Math.random() * 4),
        // preview_countdown_time: 60,
        comment_content: '我知道你一定会评论的是吧',
        transpond: Math.round(Math.random()),
        transpond_type: Math.round(Math.random() * 4),
        transpond_content: '我要转发我要转发'
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
  // onChangeStep = () => {
  //   this.setState(state => ({
  //     currentStep: state.currentStep + 1
  //   }))
  // }

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

  // 完成任务
  submit = () => {
    message.success('任务已完成')
    this.setState(state => ({
      detail: { ...state.detail, status: 2 }
    }))
  }

  // 放弃任务
  giveupTask = () => {
    Modal.confirm({
      content: `是否放弃该任务？`,
      onOk: () => {
        message.success(`任务已放弃`)
        setTimeout(() => {
          this.props.history.push({ pathname: '/home/user/task' })
        }, 1000)
      }
    })
  }

  // 任务待审核时，倒计时判断是否超过24个小时，超过则平台将自动审核通过（前端重新获取详情，更改审核状态由后端完成）
  checkConfirm = (val) => {
    if (val === 0) {
      this.setState(state => ({
        detail: { ...state.detail, status: 3 }
      }))
    }
  }

  // 任务审核不通过时，重新提交审核（前端重新获取详情）
  reCheckSubmit = () => {
    message.success('重新提交审核')
    this.setState(state => ({
      detail: { ...state.detail, status: 2 }
    }))
  }

  render() {
    const { platformVal, checkPlatformVal, preview_countdown_time, detail } = this.state
    return (
      <div className='user-taskdetail'>
        <Title title='任务详情' />

        <div className='user-taskdetail-step'>
          <Steps current={detail.status !== 6 ? detail.status - 1 : 4}>
            <Step title="进行中" />
            {/* <Step title="预览中" /> */}
            <Step title="待审核" />
            <Step title="已完成" />
            <Step title="审核不通过" />
            <Step title="违规" />
          </Steps>
          {/* <Button type='primary' onClick={this.onChangeStep}>下一步</Button> */}
        </div>

        {/* 任务在不同状态下展示不一样 */}
        {
          // 任务进行中时显示
          detail.status === 1 &&
          <div className='taskdetail-status-note'>
            <p className='note-p'>提示：刷手必须在 <Countdown time={dict.complete_countdown_time_dict[detail.complete_countdown_time] * 60} /> 内完成任务，否则将自动放弃任务</p>
          </div>
        }
        {
          // 任务待审核时显示
          detail.status === 2 &&
          <div className='taskdetail-status-note'>
            <p className='note-title'>任务已完成，等待创作者审核</p>
            <p className='note-p'>若创作者在 <Countdown time={countdown_time} onChange={this.checkConfirm} /> 内未操作，平台将自动审核通过</p>
          </div>
        }
        {
          // 任务已完成时显示
          detail.status === 3 &&
          <div className='taskdetail-status-note'>
            <p className='note-title'>任务已完成</p>
          </div>
        }
        {
          // 任务已完成时显示
          detail.status === 4 &&
          <div className='taskdetail-status-note'>
            <p className='note-title'>审核不通过</p>
            <div className='note-reason'>
              <div>
                <p>审核不通过原因：</p>
                {
                  detail.status_reason.map((item, index) => {
                    return <p key={index} className='danger'>{index + 1}. {dict.task_status_reason_dict[item]}</p>
                  })
                }
                <p>审核不通过图片：</p>
                {
                  detail.status_reason_imgs.length > 0 ?
                    <UploadImg isDetail={true} img_src={detail.status_reason_imgs} multiple={true}></UploadImg>
                    :
                    <p>无</p>
                }
                <Button type='primary' onClick={this.reCheckSubmit}>重新提交审核</Button>
              </div>
            </div>
          </div>
        }

        {
          // 任务违规时显示
          detail.status === 6 &&
          <div className='taskdetail-status-note'>
            <p className='note-title'>任务违规</p>
            <p className='note-p' style={{ fontSize: '16px' }}>编号为<span className='danger'>{detail.id}</span>的任务关注保留时间是<span className='danger'>{dict.attention_time_dict[detail.attention_time]}</span>，创作者抽查到刷手在该时间内取消关注，扣除<span className='danger'>{detail.attention_time + 1}金币</span></p>
          </div>
        }


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
            <ul>
              <li><p>任务编号：</p><p className='danger'>{detail.id}</p></li>
              <li><p>发布方：</p><p className='danger'>{detail.username}</p></li>
              <li><p>活动平台：</p><p className='danger'>{dict.platform_dict[detail.platform_type]}</p></li>
              <li><p>发布平台账号：</p><p className='danger'>{detail.platform_name}</p></li>
              <li><p>活动入口：</p><p className='danger'>{detail.task_entry === 0 && '搜索账号进入'}</p></li>
              {/* <li><p>任务发布时间：</p><p>{detail.create_time}</p></li> */}
              <li><p>佣金：</p><p><span className='danger'>{detail.user_gold}</span>金币</p></li>
              <li><p>接手平台账号：</p><p className='danger'>{detail.taskover_platform}</p></li>

              {/* <li><p>规定任务完成时间：</p><p><span className='danger'>{dict.complete_countdown_time_dict[detail.complete_countdown_time]}</span>分钟<span className='danger'>（必须在该时间内完成，否则将自动放弃任务）</span></p></li> */}

              <li style={{ width: '100%', lineHeight: '22px', alignItems: 'flex-start' }}><p>任务备注：</p><p className='fontColor1'>{detail.remark}</p></li>
            </ul>
          </div>
        </div>



        {/* 任务要求 */}

        <div className='taskdetail-detail'>
          <div className='taskdetail-note'>注意：必须认真按照任务要求完成，避免审核不通过导致重做或者记录违规扣除金币等损失</div>
          <ul>
            <li style={{ width: '100%', lineHeight: '22px', alignItems: 'flex-start' }}>
              <p>关注保留时间：</p>
              <p>
                <span className='danger'>{dict.attention_time_dict[detail.attention_time]}</span>
                <span className='fontColor1'>
                  （关注必须保留<span className=''>{dict.attention_time_dict[detail.attention_time]}</span>，创作者可在<span className=''>{dict.attention_time_dict[detail.attention_time]}</span>内随机抽查刷手是否取消关注。若<span className=''>{dict.attention_time_dict[detail.attention_time]}</span>内查不到该刷手，则扣除<span className='danger'>{detail.attention_time + 1}金币</span>给创作者，并记录一次违规）
                    </span>
              </p>
            </li>

            <li><p>任务要求：</p><p className='danger'>关注，点赞，{detail.platform_type === 0 && '收藏，'}评论</p></li>
            <li><p>评论内容：</p><p className='danger'>{detail.comment_content}</p></li>
            {
              detail.transpond === 1 &&
              <React.Fragment>
                <li><p>转发：</p><p className='danger'>{dict.share_dict_toutiao[detail.transpond_type]}</p></li>
                {
                  detail.transpond_content &&
                  <li><p>转发内容：</p><p className='danger'>{detail.transpond_content}</p></li>
                }
              </React.Fragment>
            }

            {
              // 任务进行中时显示
              detail.status === 1 &&
              <React.Fragment>
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

                {
                  checkPlatformVal &&
                  <React.Fragment>
                    <li>
                      <p>预览倒计时：</p>
                      <p>
                        <Countdown time={preview_countdown_time} type={1} onChange={(val) => {
                          this.setState({ preview_countdown_time: val })
                        }} />秒
                        <span className='danger'>（必须预览够60秒，才能够提交任务）</span>
                      </p>
                    </li>
                  </React.Fragment>
                }
                <li>
                  <Button type='primary' disabled={preview_countdown_time > 0} onClick={this.submit}>完成任务</Button>
                  <Button style={{ marginLeft: '10px' }} type='dashed' onClick={this.giveupTask}>放弃</Button>
                </li>
              </React.Fragment>
            }
          </ul>
        </div>

      </div>
    )
  }
}

export default UserTaskList