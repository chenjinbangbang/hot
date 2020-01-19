/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
// import ReactDOM from 'react-dom'
import './index.scss'
// import { Link } from 'react-router-dom'
import { Form, Input, Button, message, Icon, Modal } from 'antd'
import Title from '@/components/title/title'

import userImg from '@/assets/imgs/user.jpg'

// 今日头条
import toutiao_platform_head_thumb from '@/assets/imgs/toutiao_platform_head_thumb.png'
import toutiao_platform_image_src from '@/assets/imgs/toutiao_platform_image_src.png'
// 抖音短视频
import douyin_platform_head_thumb from '@/assets/imgs/douyin_platform_head_thumb.png'
import douyin_platform_image_src from '@/assets/imgs/douyin_platform_image_src.png'
// 火山小视频
import huoshan_platform_head_thumb from '@/assets/imgs/huoshan_platform_head_thumb.png'
import huoshan_platform_image_src from '@/assets/imgs/huoshan_platform_image_src.png'
// 快手
import kuaishou_platform_head_thumb from '@/assets/imgs/kuaishou_platform_head_thumb.png'
import kuaishou_platform_image_src from '@/assets/imgs/kuaishou_platform_image_src.png'


import { checkFile } from '@/util/api'

// 根据平台账号类型，判断modal的标题和截图实例
let platformTitle = {
  0: {
    title: '头条号',
    platform_head_thumb: toutiao_platform_head_thumb,
    platform_image_src: toutiao_platform_image_src
  },
  1: {
    title: '抖音号',
    platform_head_thumb: douyin_platform_head_thumb,
    platform_image_src: douyin_platform_image_src
  },
  2: {
    title: '火山号',
    platform_head_thumb: huoshan_platform_head_thumb,
    platform_image_src: huoshan_platform_image_src
  },
  3: {
    title: '快手号',
    platform_head_thumb: kuaishou_platform_head_thumb,
    platform_image_src: kuaishou_platform_image_src
  },
}

// 审核/冻结状态字典
let statusDict = {
  0: {
    text: '审核中',
    class: 'warning'
  },
  1: {
    text: '未通过',
    class: 'error'
  },
  2: {
    text: '正常',
    class: 'success'
  },
  3: {
    text: '已冻结',
    class: 'error'
  }
}

// 审核不通过原因/冻结原因字典（status为0或3时使用）
let reasionDict = {
  0: '平台不存在该账号',
  1: '账号头像与账号不对应',
  2: '账号截图和填写的信息不对应',
  3: '违规超过10次'
}

class Platform extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false, // 点击按钮加载
      visible: false, // 查看，新增，编辑账号浮层的显示与隐藏
      platformType: 0, // 操作哪个平台的账号：0 今日头条，1 抖音短视频，2 火山小视频，3 快手
      platformOperation: 1, // 操作类型：0 查看，1 新增，2 编辑
      // modal的标题
      platformOperationTitle: {
        0: '查看',
        1: '新增',
        2: '编辑'
      },



      // 某个平台账号详情
      platformDetail: {
        id: 1,
        user_id: 10,
        platform_name: '蓝色_天空',
        platform_type: 0,
        platform_head_thumb: '',
        platform_image_src: '',
        status: 2,
        reasion: 0
      },

      // 平台账号列表信息
      platform: [
        // 今日头条
        [
          {
            id: 1,
            user_id: 10,
            platform_name: '蓝色_天空',
            platform_type: 0,
            platform_head_thumb: '',
            platform_image_src: '',
            status: 2,
            reasion: 0
          },
          {
            id: 2,
            user_id: 20,
            platform_name: '我的唯一',
            platform_type: 0,
            platform_head_thumb: '',
            platform_image_src: '',
            status: 3,
            reasion: 0
          }
        ],
        // 抖音短视频
        [
          {
            id: 1,
            user_id: 10,
            platform_name: 'huoshan',
            platform_type: 2,
            platform_head_thumb: '',
            platform_image_src: '',
            status: 2,
            reasion: 0
          }
        ],
        // 火山小视频
        [
          {
            id: 1,
            user_id: 10,
            platform_name: 'huoshan',
            platform_type: 2,
            platform_head_thumb: '',
            platform_image_src: '',
            status: 2,
            reasion: 0
          }
        ],
        // 快手
        [
          {
            id: 1,
            user_id: 10,
            platform_name: 'kuaishou',
            platform_type: 3,
            platform_head_thumb: '',
            platform_image_src: '',
            status: 2,
            reasion: 0
          }
        ]
      ],

      imgSrc: null, // modal预览图片路径
      imgVisibile: false, // modal浮层的显示与隐藏

      platform_head_thumb: null, // 平台账号头像（file对象格式）
      platform_image_src: null, // 平台账号截图（file对象格式）
    }
  }

  UNSAFE_componentWillMount() {

  }

  // modal预览图片
  showImg(imgSrc) {
    this.setState({
      imgSrc,
      imgVisible: true
    })
  }

  // 点击平台账号，进行查看，新增，编辑账号浮层（index: 0 今日头条，1 抖音短视频，2 火山小视频，3 快手，type：0 查看，1 新增, id：平台账号id）
  showPlatform = (index, type, id, e) => {
    console.log(index, type, id)

    if (type === 0) {
      // 查看
      this.setState({
        platformDetail: {
          id: 1,
          user_id: 10,
          platform_name: '蓝色_天空',
          platform_type: 0,
          platform_head_thumb: 'http://www.ixiupet.com/uploads/allimg/190110/278-1Z110162K1R2.png',
          platform_image_src: 'http://www.ixiupet.com/uploads/allimg/190110/278-1Z110162K1R2.png',
          status: 2,
          reasion: 0
        }
      })
    } else if (type === 1) {
      // 新增
    }
    this.setState({
      visible: true,
      platformType: index,
      platformOperation: type
    })
  }

  // 上传平台账号头像
  platform_head_thumbFileUpload = (e) => {
    let file = this.refs.platform_head_thumb.files[0]

    // 上传文件，判断支持格式图片，支持则返回blob
    let src = checkFile(file)
    console.log(src)
    if (src) {
      this.setState(state => ({
        platform_head_thumb: file,
        platformDetail: { ...state.platformDetail, platform_head_thumb: src }
      }))
    }
  }

  // 上传平台账号截图
  platform_image_srcFileUpload = (e) => {
    let file = this.refs.platform_image_src.files[0]

    // 上传文件，判断支持格式图片，支持则返回blob
    let src = checkFile(file)
    if (src) {
      this.setState(state => ({
        platform_image_src: file,
        platformDetail: { ...state.platformDetail, platform_image_src: src }
      }))
    }
  }

  // 关闭浮层
  onCancel = () => {
    // 重置表单
    this.props.form.resetFields()
    this.setState(state => ({
      platform_head_thumb: null,
      platform_image_src: null,
      platformDetail: { ...state.platformDetail, platform_head_thumb: '', platform_image_src: '' },
      visible: false
    }))
  }

  // 提交表单
  handleSubmit = e => {
    e.preventDefault()

    // console.log(this.props.form.getFieldsValue(['username']))
    // console.log(this.props.form.getFieldValue('username'))
    // this.props.form.getFieldValue('password')

    // 校验并获取一组输入域的值与Error，若fieldNames参数为空，则校验全部组件
    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (!err) {

        // 判断是否上传身份证正面和手持身份证半身照
        if (!this.state.platform_head_thumb) {
          return message.error('请上传平台账号头像')
        }
        if (!this.state.platform_image_src) {
          return message.error('请上传平台账号截图')
        }

        this.setState({ loading: true })
      } else {
        // console.log(err)
        message.error(Object.values(err)[0].errors[0].message)
      }
    });
  }

  render() {
    const { loading,
      visible, platformType, platformOperation, platformOperationTitle,
      platform, platformDetail, imgSrc, imgVisible } = this.state
    const { getFieldDecorator } = this.props.form

    //   <ul>
    //     <li>
    //         <span>请加QQ群：</span>
    //         <a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=9bf0a1a8517b78cb1212a5152363e5607833c457aa524fc49469f2df26223eba">
    //             <img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="民间拍会员群" title="民间拍会员群">
    //         </a>
    //         <span>（群号：726351208）</span>
    //         </li>
    //     <li>
    //         <span>联系客服1：</span>
    //         <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1312480793&site=qq&menu=yes">
    //             <img border="0" src="http://wpa.qq.com/pa?p=2:1312480793:41" alt="联系客服1" title="联系客服1"/>
    //         </a>
    //     </li>
    //     <li>
    //         <span>联系客服2：</span>
    //         <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:1653103050:51" alt="联系客服2" title="联系客服2"/></a>
    //     </li>
    // </ul>

    return (
      <div className='platform'>
        <Title title='账号管理' />

        <div className='note'>
          <p>平台账号要求：</p>
          <p>1. 暂支持头条号，抖音号，火山号，快手号，后续会支持其他平台</p>
          <p>2. 平台账号必须有头像，便于做任务时容易找到</p>
          <p>3. 每个平台最多可提交3个账号</p>
          <p>4. 填写完提交后，审核24小时内完成，若24小时后还没有审核结果，则联系QQ1312480793
            {/* <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1312480793&site=qq&menu=yes">
              <img border="0" src="http://wpa.qq.com/pa?p=2:1312480793:41" alt="联系客服1" title="联系客服1" />
            </a> */}
            审核</p>
        </div>

        <Modal visible={imgVisible} footer={null} onCancel={() => { this.setState({ imgVisible: false }) }}>
          <img src={imgSrc} style={{ width: '100%' }} alt='img_src' />
        </Modal>

        {/* 查看，新增，编辑账号浮层 */}
        <Modal title={platformOperationTitle[platformOperation] + platformTitle[platformType].title} visible={visible} footer={null} onCancel={this.onCancel} maskClosable={false} width='700px'>
          <div className='platform-info'>
            {
              // 0查看时显示
              platformOperation === 0 &&
              <Button className='platform-alter' type='dashed' onClick={() => { this.setState({ platformOperation: 2 }) }}>修改</Button>
            }
            <Form onSubmit={this.handleSubmit} labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} className='platform-form'>
              <Form.Item label='平台账号名称' hasFeedback>
                {
                  getFieldDecorator('platform_name', {
                    initialValue: platformOperation === 2 ? platformDetail.platform_name : '', // 2修改时显示
                    validateTrigger: 'onBlur',
                    rules: [{ required: true, message: '请输入平台账号名称' }, { max: 50, message: '平台账号名称不能超过50个字符' }]
                  })(
                    platformOperation === 0 ?
                      <p>{platformDetail.platform_name}</p>
                      :
                      <Input placeholder='请输入平台账号名称' />
                  )
                }
              </Form.Item>
              <Form.Item label='平台账号头像' required>
                <div className='file-src'>
                  <div>
                    <input type='file' ref='platform_head_thumb' onChange={this.platform_head_thumbFileUpload} style={{ position: 'fixed', top: '-1000px' }} />
                    {
                      platformDetail.platform_head_thumb ?
                        (
                          <React.Fragment>
                            <img src={platformDetail.platform_head_thumb} alt='img_src' onClick={this.showImg.bind(this, platformDetail.platform_head_thumb)} />
                            {
                              // 1新增，2编辑时显示
                              platformOperation !== 0 &&
                              <div className='img-alter' onClick={() => { this.refs.platform_head_thumb.click() }}>修改图片</div>
                            }
                          </React.Fragment>
                        )
                        :
                        <Icon type="plus" onClick={() => { this.refs.platform_head_thumb.click() }}></Icon>
                    }
                  </div>
                  {
                    // 1新增，2编辑时显示
                    platformOperation !== 0 &&
                    <Button className='img-example' type='link' onClick={this.showImg.bind(this, platformTitle[platformType].platform_head_thumb)}>截图示例</Button>
                  }

                </div>
              </Form.Item>
              <Form.Item label='平台账号截图' required>
                <div className='file-src'>
                  <div>
                    <input type='file' ref='platform_image_src' onChange={this.platform_image_srcFileUpload} style={{ position: 'fixed', top: '-1000px' }} />
                    {
                      platformDetail.platform_image_src ?
                        (
                          <React.Fragment>
                            <img src={platformDetail.platform_image_src} alt='img_src' onClick={this.showImg.bind(this, platformDetail.platform_image_src)} />
                            {
                              // 1新增，2编辑时显示
                              platformOperation !== 0 &&
                              <div className='img-alter' onClick={() => { this.refs.platform_image_src.click() }}>修改图片</div>
                            }
                          </React.Fragment>
                        )
                        :
                        <Icon type="plus" onClick={() => { this.refs.platform_image_src.click() }}></Icon>
                    }
                  </div>
                  {
                    // 1新增，2编辑时显示
                    platformOperation !== 0 &&
                    <Button className='img-example' type='link' onClick={this.showImg.bind(this, platformTitle[platformType].platform_image_src)}>截图示例</Button>
                  }
                </div>
              </Form.Item>
              {
                // 0查看和2编辑时显示
                platformOperation !== 1 &&
                <Form.Item label='状态'>
                  <span className={statusDict[platformDetail.status].class}>{statusDict[platformDetail.status].text}</span>
                </Form.Item>
              }
              {
                // 0查看和2编辑时，并且状态为1未通过或3已冻结时显示
                (platformOperation !== 1 && (platformDetail.status === 1 || platformDetail.status === 3)) &&
                <Form.Item label={platformDetail.status === 1 ? '审核不通过原因' : platformDetail.status === 3 ? '冻结原因' : ''}>
                  <span className='error'>{reasionDict[platformDetail.reasion]}</span>
                </Form.Item>
              }
              {
                // 1新增和2编辑时显示
                platformOperation !== 0 &&
                <Form.Item wrapperCol={{ offset: 6 }}>
                  <Button type='primary' htmlType='submit' loading={loading}>保存</Button>
                </Form.Item>
              }

            </Form>
          </div>

        </Modal>

        <div className='platform-home'>

          {/* 今日头条 */}
          {
            platform.map((item, index) => (
              <div className="platform-account" key={index}>
                <div className='platform-title'>{platformTitle[index].title}</div>
                <div className='platform-list'>
                  {
                    item.map((item1, index1) => (
                      <div className='list-item' key={index1} onClick={this.showPlatform.bind(this, index, 0, item1.id)}>
                        <img className='user-img' src={item1.platform_head_thumb || userImg} alt='账号名称' />
                        <p className='user-name ellipsis'>{item1.platform_name}</p>
                        <p className='user-status'>
                          <span className={statusDict[item1.status].class}>{statusDict[item1.status].text}</span>
                        </p>
                      </div>
                    ))
                  }
                  {
                    item.length < 3 &&
                    <div className='list-plus' onClick={this.showPlatform.bind(this, index, 1, null)}>
                      <div>
                        <Icon type="plus"></Icon>
                        <p>添加{platformTitle[index].title}</p>
                      </div>
                    </div>
                  }
                </div>
              </div>
            ))
          }

        </div>
      </div >
    )
  }
}

const PlatformForm = Form.create({})(Platform)

export default PlatformForm