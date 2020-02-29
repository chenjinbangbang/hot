import React from 'react'
import recomputed, { $state, $props } from 'recomputed'
import './index.scss'
// import { Link } from 'react-router-dom'
import { Form, Radio, Select, Switch, Input, Icon, Button, InputNumber, message, Modal } from 'antd'
import Title from '@/components/title/title'
import UploadImg from '@/components/uploadimg/uploadimg'
import dict from '@/util/dict'

// 截图示例
// 今日头条
import toutiao_task1 from '@/assets/imgs/toutiao_task1.jpg'
import toutiao_task2 from '@/assets/imgs/toutiao_task2.jpg'
// 抖音短视频
import douyin_task1 from '@/assets/imgs/douyin_task1.jpg'
import douyin_task2 from '@/assets/imgs/douyin_task2.jpg'
// 火山小视频
import huoshan_task1 from '@/assets/imgs/huoshan_task1.jpg'
import huoshan_task2 from '@/assets/imgs/huoshan_task2.jpg'
// 快手
import kuaishou_task1 from '@/assets/imgs/kuaishou_task1.jpg'
import kuaishou_task2 from '@/assets/imgs/kuaishou_task2.jpg'

// 根据平台账号类型，判断modal的截图示例
let taskImgs = {
  0: {
    task_img1: toutiao_task1,
    task_img2: toutiao_task2
  },
  1: {
    task_img1: douyin_task1,
    task_img2: douyin_task2
  },
  2: {
    task_img1: huoshan_task1,
    task_img2: huoshan_task2
  },
  3: {
    task_img1: kuaishou_task1,
    task_img2: kuaishou_task2
  },
}


const { Option } = Select
const { TextArea } = Input

class Taskpublish extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false, // 点击按钮加载
      mount: 10,
      publishVisible: false, // 发布任务之前的浮层提示显示与隐藏
      form: {}, // 表单数据

      task_img1: null, // 任务图片1
      task_img2: null, // 任务图片2

      comment: '', // 输入框的评论
      // comment_content: ['你好漂亮！！', '哈哈哈，搞笑', '我要统一地球，谁也不要拦着我', '我爱你，群主，你是我的最爱', '哈哈哈，搞笑', '我爱你，群主，你是我的最爱'] // 评论
      comment_content: [], // 评论，用于提交发布任务，由后端随机分配

      // 分享字典表
      // share_dict: dict.share_dict_toutiao,
      // 转发类型，转发数，转发内容，用于提交发布任务，由后端随机分配
      transpond_content: [
        // {
        //   type: 0,
        //   name: '',  // 不用传
        //   num: 0,
        //   content: '', // 不用传
        //   contentList: []
        // },
        // ...
      ],

      imgSrc: null, // modal预览图片路径
      imgVisible: false, // modal浮层的显示与隐藏
    }

    // 计算消耗金币总计
    const composer = recomputed(this)
    // 计算基础金币
    this.getBasicAmount = composer(
      // $state('transpond_content'),
      $props('form'), // 这个才有用
      (form) => {
        let data = form.getFieldsValue()
        // console.log(transpond_content)

        // 转发数
        // let num = 0
        // transpond_content.forEach(item => {
        //   num += item.num
        // })
        // console.log(data)
        // console.log(data.platform_type === 0)
        // console.log(data.collect)
        // console.log(data.platform_type === 0)

        // 起步：0.1金币， 关注：0.1金币， 关注保留时间：时间*0.1金币， 点赞：0.1金币， 收藏：0.1金币，评论：0.2金币， 转发：0.2金币（今日头条才有收藏）
        let gold = 0.6
        if (data.attention) {
          gold = data.task_num *
            (0.1 * 10 + (data.attention && 0.1) * 10 + (data.attention_time * 0.1) * 10 + (data.comment && 0.2) * 10 + (data.give_like && 0.1) * 10 + (data.platform_type === 0 ? 0.1 : 0) * 10) / 10
        }

        return gold
      }
    )

    // 计算转发所消耗的金币
    this.getTranspondAmount = composer(
      $state('transpond_content'),
      $props('form'),
      (transpond_content) => {
        // 转发数
        // console.log(transpond_content)
        let num = 0
        transpond_content.forEach(item => {
          num = num + item.num
        })
        // console.log(num)
        return num * 10 * 0.2 / 10
      }
    )

    // 消耗金币总计
    this.getTotalAmount = composer(
      $props('form'),
      (form) => {
        let gold = (this.getBasicAmount() * 10 + this.getTranspondAmount() * 10) / 10
        return gold
      }
    )

  }

  UNSAFE_componentWillMount() {

    // setTimeout(() => {
    //   this.setState({
    //     mount: 100
    //   })
    // }, 1000)

    // 处理转发数据
    const share_dict = dict.share_dict_toutiao // 分享字典表
    let transpond_content = []
    for (let i in share_dict) {
      // console.log(typeof i)
      transpond_content.push({
        type: Number(i),
        name: share_dict[i],
        num: 0,
        content: '',
        contentList: []
      })
    }
    this.setState({
      transpond_content
    })
  }

  // modal预览图片
  showImg(imgSrc) {
    this.setState({
      imgSrc,
      imgVisible: true
    })
  }


  // 上传图片
  taskImageFileUpload = (index, src) => {
    if (index === 0) {
      this.setState({
        task_img1: src
      })
    } else if (index === 1) {
      this.setState({
        task_img2: src
      })
    }
  }

  // 发布任务数校验
  validateTaskNum = (rule, value, callback) => {
    const { comment_content, transpond_content } = this.state
    if (value) {
      if (value > 1000) {
        callback('一次最多发布1000个任务')
      } else if (value < comment_content.length) {
        callback('发布任务数不能少于评论内容数，请删除部分评论内容')
      } else {
        let num = 0
        transpond_content.forEach(item => {
          num += item.num
        })
        if (value < num) {
          callback('发布任务数不能少于转发数，请更改转发的数量')
        }
      }
    }
    callback()
  }

  //================================================ 评论 ================================================
  // 评论内容的双向绑定
  handleChangeComment = (e) => {
    e.preventDefault();
    const value = e.target.value;
    this.setState({
      comment: value
    })
  }

  // 添加评价内容
  commentFn = () => {
    const task_num = this.props.form.getFieldValue('task_num')
    const { comment, comment_content } = this.state

    if (!comment) {
      return
    }

    if (comment_content.length > (task_num - 1)) {
      message.error('评论内容数不能超过发布任务数')
      return
    }

    this.setState(state => ({
      comment_content: [...state.comment_content, comment],
      comment: ''
    }))
  }

  // 删除评论内容
  commentDelete = (index) => {
    const { comment_content } = this.state
    comment_content.splice(index, 1)
    this.setState({
      comment_content
    }, () => {
      this.props.form.validateFields(['task_num'], { force: true })
    })
  }

  //================================================ 转发 ================================================
  // 是否转发事件
  transpondChange = (checked) => {
    // console.log('是否转发事件')
    if (!checked) {
      // 转发数初始化
      let { transpond_content } = this.state
      transpond_content.forEach(item => {
        item.num = 0
      })
      this.setState({ transpond_content })
    }
  }

  // 更改转发数，max属性改变时，也会触发这个事件
  changeTranspondNum(index, number) {
    // console.log(index, number)
    // console.log('更改转发数：', index, number)
    // const task_num = this.props.form.getFieldValue('task_num')
    let { transpond_content } = this.state

    // console.log(index, number, transpond_content[index].num)

    transpond_content[index].num = number

    // 转发数不能超过发布任务数
    // let num = 0
    // transpond_content.forEach(item => {
    //   num += item.num
    // })
    // console.log('转发数：', num)
    // 需要添加max属性，不然在form的值改变时，也会自动更改InputNumber的值。所以要和max属性配合使用（max属性的值变化时，也会触发onChange事件，所以不适用）
    // if (num > task_num) {
    //   return message.error('转发数不能超过发布任务数')
    // }

    // 转发数不能小于转发内容数，请删除部分转发内容
    // if (transpond_content[index].num < transpond_content[index].contentList.length) {
    //   return message.error('转发数不能小于转发内容数，请删除部分转发内容')
    // }

    this.setState({
      transpond_content
    }, () => {
      this.props.form.validateFields(['task_num'], { force: true })
    })
  }

  // 转发内容的双向绑定
  handleChangeTranspond = (index, e) => {
    // console.log('转发内容的双向绑定')
    e.preventDefault()
    let { transpond_content } = this.state
    let value = e.target.value
    transpond_content[index].content = value
    // console.log(transpond_content)
    this.setState({
      transpond_content
    })
  }

  // 添加转发内容
  transpondFn = (index) => {
    // console.log(index)
    const { transpond_content } = this.state
    // console.log(transpond_content[index].content)

    if (!transpond_content[index].content) {
      return
    }

    if (transpond_content[index].contentList.length > (transpond_content[index].num - 1)) {
      message.error('转发内容数不能超过转发数')
      return
    }
    transpond_content[index].contentList.push(transpond_content[index].content)
    transpond_content[index].content = ''

    this.setState({
      transpond_content
    })
  }

  // 删除转发内容
  transpondDelete = (index) => {
    const { transpond_content } = this.state
    transpond_content[index].contentList.splice(index, 1)
    this.setState({
      transpond_content
    })
  }

  // 提交表单
  handleSubmit = e => {
    e.preventDefault()
    // console.log(this.props.form.getFieldsValue())
    const { task_img1, task_img2, comment_content, transpond_content } = this.state

    // console.log(this.props.form.getFieldsValue(['username']))
    // console.log(this.props.form.getFieldValue('username'))
    // this.props.form.getFieldValue('password')
    // console.log('error: ', this.props.form.getFieldsError())

    // 校验并获取一组输入域的值与Error，若fieldNames参数为空，则校验全部组件
    this.props.form.validateFields((err, values) => {
      // console.log(err, values)
      if (!err) {

        // transpond_content.forEach(item => {
        //   delete item.name
        //   delete item.content
        // })

        // this.setState({ loading: true })

        // if (!task_img1) {
        //   return message.error('请上传任务截图1')
        // }
        // if (!task_img2) {
        //   return message.error('请上传任务截图2')
        // }


        values.task_img1 = task_img1
        values.task_img2 = task_img2
        values.comment_content = comment_content
        values.transpond_content = transpond_content

        console.log(values)

        this.setState({
          publishVisible: true,
          form: values
        })
        // Modal.confirm({
        //   // content: `消耗金币总计${this.getTotalAmount()}金币。发布后不可修改任务，请检查确定无误后再发布`,
        //   content: <div>
        //     <p>消耗金币总计<span className='danger' style={{ fontSize: '24px' }}>{this.getTotalAmount()}</span>金币</p>
        //     <p>发布后不可修改任务，请检查确定无误后再发布</p>
        //   </div>,
        //   onOk: () => {
        //     message.success('任务发布成功')
        //   }
        // })

      } else {
        // console.log(err)
        message.error(Object.values(err)[0].errors[0].message)
      }
    });
  }

  // 发布任务
  publishFn = () => {
    const { form } = this.state
    console.log(form)
    message.success('任务发布成功')
  }

  render() {
    const { loading, publishVisible, task_img1, task_img2, comment, comment_content, transpond_content, imgSrc, imgVisible } = this.state
    const { getFieldDecorator } = this.props.form
    const { form } = this.props

    return (
      <div className='taskpublish'>
        <Title title='发布任务' />

        {/* 金币总计 */}
        <div className='total-amount'>
          <p>基础金币：{this.getBasicAmount()}金币</p>
          <p>转发金币：{this.getTranspondAmount()}金币</p>
          <p className="total">消耗金币总计：<span>{this.getTotalAmount()}</span>金币</p>
          <p>（起步需0.1金币/任务）</p>
        </div>


        <Modal visible={imgVisible} footer={null} onCancel={() => { this.setState({ imgVisible: false }) }}>
          <img src={imgSrc} style={{ width: '100%' }} alt='img_src' />
        </Modal>

        <Modal title='发布任务' visible={publishVisible} width={400} onCancel={() => { this.setState({ publishVisible: false }) }} onOk={this.publishFn}>
          <div className='taskpublish-modal'>
            <p>发布任务数：<span className='danger'>{this.state.form.task_num}</span>个</p>
            <p>消耗金币总计：<span className='danger'>{this.getTotalAmount()}</span>金币</p>
            <p>发布后不可修改任务，请检查确定无误后再发布</p>
          </div>
        </Modal >

        <Form onSubmit={this.handleSubmit} labelCol={{ span: 3 }} wrapperCol={{ span: 18 }} className='taskpublish-form'>
          <Form.Item label='活动平台'>
            {
              getFieldDecorator('platform_type', {
                initialValue: 0,
                // validateTrigger: 'onBlur',
                rules: [{ required: true, message: '请选择活动平台' }]
              })(
                <Radio.Group>
                  <Radio value={0}>今日头条</Radio>
                  <Radio value={1}>抖音短视频</Radio>
                  <Radio value={2}>火山小视频</Radio>
                  <Radio value={3}>快手</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label='选择账号' required>
            {
              getFieldDecorator('platform_id', {
                initialValue: 0,
              })(
                <Select style={{ width: 200 }} placeholder='请选择账号'>
                  <Option value={0}>我的_唯一</Option>
                  <Option value={1}>sdusdu</Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label='任务截图' required>
            <div className='file-src'>
              <UploadImg isDetail={false} img_src={task_img1} fileUpload={this.taskImageFileUpload.bind(this, 0)} ></UploadImg>
              <Button className='img-example' type='link' onClick={this.showImg.bind(this, taskImgs[form.getFieldValue('platform_type')].task_img1)}>截图示例1</Button>
              <UploadImg isDetail={false} img_src={task_img2} fileUpload={this.taskImageFileUpload.bind(this, 1)} ></UploadImg>
              <Button className='img-example' type='link' onClick={this.showImg.bind(this, taskImgs[form.getFieldValue('platform_type')].task_img2)}>截图示例2</Button>
              <span className='taskpublish-note' style={{ marginTop: 'auto' }}>上传任务截图，让刷手更容易找到</span>
            </div>
          </Form.Item>
          <Form.Item label='活动入口' required>
            {
              getFieldDecorator('task_entry', {
                initialValue: 0,
              })(
                <Radio.Group>
                  <Radio value={0}>搜索账号进入</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label='任务完成时间' required>
            {
              getFieldDecorator('complete_time', {
                initialValue: 0,
              })(
                // <Radio.Group>
                //   <Radio value={0}>10分钟</Radio>
                //   <Radio value={1}>20分钟</Radio>
                //   <Radio value={2}>30分钟</Radio>
                //   <Radio value={3}>40分钟</Radio>
                //   <Radio value={4}>50分钟</Radio>
                //   <Radio value={6}>60分钟</Radio>
                // </Radio.Group>
                <Select style={{ width: 100 }} placeholder='任务完成时间'>
                  <Option value={0}>10分钟</Option>
                  <Option value={1}>20分钟</Option>
                  <Option value={2}>30分钟</Option>
                  <Option value={3}>40分钟</Option>
                  <Option value={4}>50分钟</Option>
                  <Option value={5}>60分钟</Option>
                </Select>
              )
            }
            <span className='taskpublish-note'>若刷手超过该时间，则被认定为自动放弃任务</span>
          </Form.Item>
          <Form.Item label='发布任务数'>
            {
              getFieldDecorator('task_num', {
                initialValue: 1,
                // validateTrigger: 'onBlur',
                rules: [{ required: true, message: '请输入发布任务数' }, { validator: this.validateTaskNum }]
              })(
                <InputNumber min={1} max={1000} step={1} precision={0}></InputNumber>
              )
            }
            <span className='form-note'>个</span>
            <span className='taskpublish-note'>一次最多发布1000个任务</span>
          </Form.Item>
          <Form.Item label='是否关注' required>
            {
              getFieldDecorator('attention', {
                initialValue: true,
                valuePropName: 'checked'
                // getValueFromEvent: (val) => (val ? 1 : 0)
              })(
                <Switch checkedChildren='是' unCheckedChildren='否' disabled={true} />
              )
            }
            <span className='taskpublish-gold'>0.1金币（默认关注）</span>
          </Form.Item>
          <Form.Item label='关注保留时间' required>
            {
              getFieldDecorator('attention_time', {
                initialValue: 0,
              })(
                <Radio.Group>
                  {
                    Object.values(dict.attention_time_dict).map((item, index) => {
                      return <Radio key={index} value={index}>{item}</Radio>
                    })
                  }
                </Radio.Group>
              )
            }

            <span className='taskpublish-gold' style={{ marginLeft: '0' }}><span className='gold'>{form.getFieldValue('attention_time') * 10 * 0.1 / 10}金币</span></span>
            <br />
            <span className='fontColor1'>关注必须保留3个月，创作者可在3个月内随机抽查刷手是否取消关注。若3个月内查不到该刷手，则扣除1金币给创作者，并记录一次违规。若选择了其他时间，刷手在该时间内取消关注，则在扣除n+1个金币，如半年扣除2金币，1年扣除3金币，2年扣除4金币，3年扣除5金币，并记录一次违规</span>
          </Form.Item>
          <Form.Item label='是否点赞' required>
            {
              getFieldDecorator('give_like', {
                initialValue: true,
                valuePropName: 'checked'
              })(
                <Switch checkedChildren='是' unCheckedChildren='否' disabled={true} />
              )
            }
            <span className='taskpublish-gold'>0.1金币（默认点赞）</span>
          </Form.Item>
          {
            // 今日头条才有收藏
            form.getFieldValue('platform_type') === 0 &&
            <Form.Item label='是否收藏' required>
              {
                getFieldDecorator('collect', {
                  initialValue: true,
                  valuePropName: 'checked'
                })(
                  <Switch checkedChildren='是' unCheckedChildren='否' disabled={true} />
                )
              }
              <span className='taskpublish-gold'>0.1金币（默认收藏，今日头条才有）</span>
            </Form.Item>
          }

          <Form.Item label='是否评论' required>
            {
              getFieldDecorator('comment', {
                initialValue: true,
                valuePropName: 'checked'
              })(
                <Switch checkedChildren='是' unCheckedChildren='否' disabled={true} />
              )
            }
            {
              form.getFieldValue('comment') &&
              <span className='taskpublish-gold'>0.2金币（默认评论）</span>
            }
          </Form.Item>
          {
            form.getFieldValue('comment') &&
            <Form.Item label='评论内容'>
              <div className='taskpublish-content'>
                <TextArea value={comment} maxLength={50} placeholder='请输入评论内容' autoSize={{ minRows: 4, maxRows: 4 }} onChange={this.handleChangeComment} />
                <div className='text-example'>
                  <p>可添加评论内容，随机分配给刷手进行评论，其余未分配的评论由刷手进行自由评论，每条评论不能大于50个字</p>
                  <Button type='primary' size='small' onClick={this.commentFn}>确定</Button>
                </div>
              </div>
              <div className='taskpublish-content-list'>
                <ul>
                  {
                    comment_content.map((item, index) => (
                      <li key={index}>
                        <p className='ellipsis'>{index + 1}. {item}</p>
                        <Icon type="close" onClick={this.commentDelete.bind(this, index)} />
                      </li>
                    ))
                  }
                </ul>
              </div>
            </Form.Item>
          }

          <Form.Item label='是否转发' required>
            {
              getFieldDecorator('transpond', {
                initialValue: true,
                valuePropName: 'checked'
              })(
                <Switch checkedChildren='是' unCheckedChildren='否' onChange={this.transpondChange} />
              )
            }
            {
              form.getFieldValue('transpond') &&
              <span className='taskpublish-gold'><span className='gold'>{this.getTranspondAmount()}金币</span>（0.2金币/转发数，<span className={form.getFieldValue('task_num') < this.getTranspondAmount() * 10 / 0.2 / 10 ? 'danger' : null}>注意：转发数不能超过发布任务数</span>）</span>

            }
          </Form.Item>
          {
            form.getFieldValue('transpond') &&
            <React.Fragment>
              {/* <Form.Item label='转发数'>
                {
                  getFieldDecorator('transpond_num', {
                    initialValue: 1,
                    // validateTrigger: 'onBlur',
                    rules: [{ required: true, message: '请输入转发数' }, { validator: this.validateTranspondNum }]
                  })(
                    <InputNumber min={1} step={1} precision={0}></InputNumber>
                  )
                }
                <span className='form-note'>个</span>
              </Form.Item> */}
              <Form.Item label='转发方式'>
                {/* {
                  getFieldDecorator('transpond_content', {
                    initialValue: 0,
                  })(
                    <Radio.Group>
                      <Radio value={0}>转发到头条</Radio>
                      <Radio value={1}>转发到微信</Radio>
                      <Radio value={2}>转发到微信朋友圈</Radio>
                      <Radio value={3}>转发到QQ</Radio>
                      <Radio value={4}>转发到QQ空间</Radio>
                    </Radio.Group>
                  )
                } */}

                <div className='transpond-content'>
                  {
                    transpond_content.map((item, index) => (
                      <React.Fragment key={index}>
                        <div className='transpond-item' key={index}>
                          <div className='transpond-type'>{item.name}：</div>
                          {/* <InputNumber value={item.num} min={0} max={form.getFieldValue('task_num') - this.getTranspondAmount() * 10 / 0.2 / 10 + item.num} step={1} precision={0} onChange={this.changeTranspondNum.bind(this, index)}></InputNumber> */}
                          <InputNumber value={item.num} min={0} step={1} precision={0} onChange={this.changeTranspondNum.bind(this, index)}></InputNumber>
                          <TextArea value={item.content} maxLength={50} placeholder='请输入转发内容' autoSize={{ minRows: 4, maxRows: 4 }} onChange={this.handleChangeTranspond.bind(this, index)} />
                          <div className='text-example'>
                            <Button type='primary' size='small' onClick={this.transpondFn.bind(this, index)}>确定</Button>
                          </div>
                          <span className='taskpublish-gold'>{item.num * 10 * 0.2 / 10}金币</span>
                        </div>
                        {
                          item.num < item.contentList.length &&
                          <div className='transpond-error'>转发数不能小于转发内容数，请删除部分转发内容</div>
                        }

                        {
                          item.contentList.length > 0 &&
                          <div className='taskpublish-content-list'>
                            <ul>
                              {
                                item.contentList.map((item1, index1) => (
                                  <li key={index1}>
                                    <p className='ellipsis'>{index1 + 1}. {item1}</p>
                                    <Icon type="close" onClick={this.transpondDelete.bind(this, index, index1)} />
                                  </li>
                                ))
                              }
                            </ul>
                          </div>
                        }
                      </React.Fragment>
                    ))
                  }
                  <div className='transpond-note'>注意：可添加评论内容，随机分配给刷手进行评论，其余未分配的评论由刷手进行自由评论，每条评论不能大于50个字</div>
                </div>
              </Form.Item>
              <Form.Item label='任务备注' wrapperCol={{ span: 10 }}>
                {
                  getFieldDecorator('remark', {
                    initialValue: '',
                    valuePropName: 'checked'
                  })(
                    <TextArea maxLength={300} placeholder='请输入任务备注，最多输入300个字' autoSize={{ minRows: 4 }} />
                  )
                }
              </Form.Item>
            </React.Fragment>
          }

          <Form.Item wrapperCol={{ offset: 3 }}>
            <div className='taskpublish-total'>
              <Button type='primary' htmlType='submit' loading={loading}>发布任务</Button>
              {/* <p>消耗金币总计：<span className='danger'>0.2</span>金币（起步需<span className='danger'>0.2</span>金币/任务）</p> */}
            </div>
          </Form.Item>
        </Form >

      </div >
    )
  }
}

const TaskpublishForm = Form.create({})(Taskpublish)

export default TaskpublishForm;