import React from 'react'
import './index.scss'
// import { Link } from 'react-router-dom'
import { Table, Modal, Form, Button, message, Radio, Input, Select, DatePicker } from 'antd'
import Title from '@/components/title/title'
import UploadImg from '@/components/uploadimg/uploadimg'
import dict from '@/util/dict'
import { request } from '@/util/api'

import userImg from '@/assets/imgs/user.jpg'

const { RangePicker } = DatePicker
const { Option } = Select

// 实名审核状态的样式
let real_dict_class = {
  0: '',
  1: 'warning',
  2: 'danger',
  3: 'success'
}

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false, // 实名认证审核浮层的显示与隐藏
      userInfo: {}, // 某个用户的数据

      reasonVisible: false, // 审核不通过的原因浮层的显示与隐藏
      real_reason: 0, // 审核不通过的原因

      freezeVisible: false, // 冻结的原因浮层的显示与隐藏
      freeze_reason: '', // 冻结的原因

      tableLoading: false, // 表格加载中
      current: 1, // 当前页
      // 公告头部信息
      columns: [
        // {
        //   title: '序号',
        //   dataIndex: 'key',
        //   // key: 'key',
        //   align: 'center',
        //   fixed: 'left',
        //   render: text => <span>{text}</span>
        // },
        {
          title: '编号',
          dataIndex: 'id',
          // key: 'id',
          align: 'center',
          fixed: 'left',
          render: text => <span>{text}</span>
        },
        {
          title: '用户名',
          dataIndex: 'username',
          // key: 'username',
          align: 'center',
          fixed: 'left',
          render: text => <span>{text}</span>
        },
        {
          title: '角色',
          dataIndex: 'role',
          // key: 'role',
          align: 'center',
          render: text => <span>{dict.role_dict[text]}</span>
        },
        {
          title: '头像',
          dataIndex: 'head_thumb',
          // key: 'head_thumb',
          align: 'center',
          render: text => <UploadImg isDetail={true} img_src={text || userImg} shape='circle' ></UploadImg>
        },
        {
          title: '师傅',
          dataIndex: 'referrer_username',
          // key: 'referrer_username',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '推广数',
          dataIndex: 'referrer_num',
          // key: 'referrer_num',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: 'E-mail',
          dataIndex: 'email',
          // key: 'email',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: 'QQ',
          dataIndex: 'qq',
          // key: 'qq',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '手机号',
          dataIndex: 'mobile',
          // key: 'mobile',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '金币',
          dataIndex: 'gold',
          // key: 'gold',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '现金',
          dataIndex: 'wealth',
          // key: 'wealth',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '是否被冻结',
          dataIndex: 'freeze_status',
          // key: 'freeze_status',
          align: 'center',
          render: text => <span className='danger'>{text === 1 ? '冻结' : ''}</span>
        },
        {
          title: '冻结原因',
          dataIndex: 'freeze_reason',
          // key: 'freeze_reason',
          align: 'center',
          render: (text, record) => <span className='danger'>{record.freeze_status === 1 && text}</span>
        },
        {
          title: 'VIP',
          dataIndex: 'isVip',
          // key: 'isVip',
          align: 'center',
          render: text => <span>{text === 0 ? '' : <span className='success'>是</span>}</span>
        },
        {
          title: '真实姓名',
          dataIndex: 'name',
          // key: 'name',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '身份证号码',
          dataIndex: 'idcardno',
          // key: 'idcardno',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '是否绑定了平台账号',
          dataIndex: 'isPlatform',
          // key: 'isPlatform',
          align: 'center',
          render: text => <span>{text ? <span className='success'>已绑定</span> : ''}</span>
        },
        {
          title: '注册时间',
          dataIndex: 'create_time',
          // key: 'create_time',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '最后登录时间',
          dataIndex: 'last_login_time',
          // key: 'last_login_time',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '实名状态',
          dataIndex: 'real_status',
          // key: 'real_status',
          align: 'center',
          fixed: 'right',
          render: (text, record) => <span className={real_dict_class[text]}>{dict.real_dict[text]}</span>
        },
        {
          title: '实名',
          dataIndex: 'operation',
          // key: 'operation',
          align: 'center',
          fixed: 'right',
          render: (text, record) => <div>
            {
              // 实名状态不等于0时展示
              record.real_status !== 0 &&
              <Button type='primary' className={record.real_status !== 1 ? 'success-btn' : ''} size='small' style={{ marginRight: 10 }} onClick={this.showRealFn.bind(this, record)}>{record.real_status === 1 ? '审核' : '详情'}</Button>
            }
          </div>
        },
        {
          title: '操作',
          dataIndex: 'operation1',
          // key: 'operation1',
          align: 'center',
          fixed: 'right',
          render: (text, record) => <div>
            {
              // 是否被冻结状态为0时，表示正常，只展示冻结按钮，否则展示解冻按钮
              record.freeze_status === 0 ?
                <Button size='small' onClick={this.showFreezeFn.bind(this, record)}>冻结</Button>
                :
                <Button type='danger' size='small' onClick={this.unfreezeFn.bind(this, record.id, record.username)}>解冻</Button>
            }
          </div>
        }
      ],
      // 公告数据
      data: []

      // 是否实名：real_status（int，0 未实名，1 待审核，2 已实名）
      // 是否是VIP会员：isVip（int：0 不是，1：是）
      // 真实姓名：name
      // 身份证号码：idcardno
      // 身份证正面：idcard_src
      // 手持身份证半身照：body_idcard_src
      // 是否绑定了平台账号：isPlatform（int，0 未绑定，1 已绑定）
    }
  }

  UNSAFE_componentWillMount() {

    // 获取用户列表
    this.getLists()

    // 获取公告数据
    // let data = []
    // for (let i = 1; i <= 200; i++) {
    //   // id,username,role,head_thumb,referrer_username,email,qq,mobile,gold,wealth,isVip,real_status,real_reason,name,idcardno,idcard_src,body_idcard_src,isPlatform,create_time,last_login_time
    //   data.push({
    //     key: i,
    //     // index: i,
    //     id: 10000 + i,
    //     username: 'sdusdu',
    //     role: Math.round(Math.random() * 2),
    //     head_thumb: '',
    //     referrer_username: '我的唯一',
    //     referrer_num: Math.round(Math.random() * 1000),
    //     email: '905690338@qq.com',
    //     qq: '905690338',
    //     mobile: '13570648992',
    //     gold: Math.round(Math.random() * 100),
    //     wealth: Math.round(Math.random() * 100),
    //     freeze_status: Math.round(Math.random()),
    //     freeze_reason: '严重违规',
    //     isVip: Math.round(Math.random()),
    //     real_status: Math.round(Math.random() * 3),
    //     real_reason: Math.round(Math.random() * 4),
    //     name: '陈进帮',
    //     idcardno: '441827199304255399',
    //     idcard_src: '',
    //     body_idcard_src: '',
    //     isPlatform: Boolean(Math.round(Math.random())),
    //     create_time: '2019-12-22 22:22:10',
    //     last_login_time: '2019-12-22 22:22:10',
    //   })
    // }
    // this.setState({ data })
  }

  // 获取用户列表
  getLists() {
    request('/api/user/list', 'post', { page: this.state.current, pageNum: 10 }).then(res => {
      // console.log(res.data)
      let data = res.data.lists
      data.forEach((item) => {
        item.key = item.id
      })
      this.setState({ data })
    })
  }

  // 提交表单进行查询筛选
  handleSubmitSearch = e => {
    e.preventDefault()

    // console.log(this.props.form.getFieldsValue(['username']))
    // console.log(this.props.form.getFieldValue('username'))
    // this.props.form.getFieldValue('password')

    // 校验并获取一组输入域的值与Error，若fieldNames参数为空，则校验全部组件
    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (!err) {
        this.setState({
          tableLoading: true
        }, () => {
          this.setState({
            tableLoading: false
          })
        })
      } else {
        // console.log(err)
        message.error(Object.values(err)[0].errors[0].message)
      }
    });
  }

  // ===================================== 实名审核 =====================================
  // 实名认证审核浮层的显示
  showRealFn(record) {
    // console.log(record)

    this.setState({
      userInfo: record,
      visible: true
    })
  }

  // 审核通过
  realConfirm = () => {
    Modal.confirm({
      // title: '实名审核是否通过？',
      content: '实名审核是否通过？',
      onOk: () => {
        const { userInfo } = this.state
        console.log(userInfo)
        message.success('审核已通过')
        this.setState({
          visible: false
        })
      }
    })
  }

  // 审核不通过
  realCancel = () => {
    const { userInfo, real_reason } = this.state
    console.log(userInfo, real_reason)

    message.warning('审核不通过')
    this.setState({
      visible: false,
      reasonVisible: false,
      real_reason: 0 // 审核不通过的原因初始化
    })
  }

  // ===================================== 冻结，解冻 =====================================
  // 冻结浮层的显示
  showFreezeFn(record) {
    // console.log(record)

    this.setState({
      userInfo: record,
      freezeVisible: true
    })
  }

  // 冻结用户
  freezeFn = () => {
    const { userInfo, freeze_reason } = this.state
    console.log(userInfo, freeze_reason)
    message.success(`${userInfo.username}已冻结`)
    this.setState({
      freezeVisible: false,
      freeze_reason: ''
    })
  }

  // 解冻用户
  unfreezeFn(id, val) {
    console.log(id, val)
    Modal.confirm({
      content: `是否要解冻${val}？`,
      onOk: () => {
        message.success(`${val}已解冻`)
      }
    })
  }

  // 表格分页
  changePage = (page) => {
    this.setState({ current: page })
  }

  render() {
    const {
      visible, userInfo,
      reasonVisible, real_reason,
      freezeVisible, freeze_reason,
      tableLoading, columns, data, current
    } = this.state
    const { getFieldDecorator } = this.props.form

    return (
      <div className='user'>
        <Title title='用户管理' />

        {/* 实名认证审核浮层 */}
        <Modal title='实名认证审核' visible={visible} footer={null} onCancel={() => { this.setState({ visible: false }) }} maskClosable={true} width='700px'>
          <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item label='真实姓名'>{userInfo.name}</Form.Item>
            <Form.Item label='身份证号码'>{userInfo.idcardno}</Form.Item>
            <Form.Item label='身份证正面'>
              <UploadImg isDetail={true} img_src={userInfo.idcard_src || userImg} ></UploadImg>
            </Form.Item>
            <Form.Item label='手持身份证半身照'>
              <UploadImg isDetail={true} img_src={userInfo.body_idcard_src || userImg} ></UploadImg>
            </Form.Item>
            <Form.Item label='实名状态'>
              <span className={real_dict_class[userInfo.real_status]}>{dict.real_dict[userInfo.real_status]}</span>
            </Form.Item>
            {
              // 审核状态为2时显示
              userInfo.real_status === 2 &&
              <Form.Item label='审核不通过的原因'>
                <span className='danger'>{dict.real_reason_dict[userInfo.real_reason]}</span>
              </Form.Item>
            }
            {
              // 审核状态为1或3时显示
              (userInfo.real_status === 1 || userInfo.real_status === 3) &&
              <Form.Item label='审核是否通过' wrapperCol={{ offset: 8 }}>
                {
                  // 审核状态为1时显示
                  userInfo.real_status === 1 &&
                  <Button style={{ marginRight: 10 }} type='primary' onClick={this.realConfirm}>通过</Button>
                }
                <Button type='danger' onClick={() => { this.setState({ reasonVisible: true }) }}>不通过</Button>
              </Form.Item>
            }
          </Form>
        </Modal>

        {/* 审核不通过时，选择审核不通过原因的浮层 */}
        <Modal className='modal-reason-style' title='请选择审核不通过的原因' visible={reasonVisible} onCancel={() => { this.setState({ reasonVisible: false, real_reason: 0 }) }} onOk={this.realCancel}>
          <Radio.Group value={real_reason} onChange={(e) => { this.setState({ real_reason: e.target.value }) }}>
            {
              Object.values(dict.real_reason_dict).map((item, index) => {
                return <Radio value={index} key={index}>{item}</Radio>
              })
            }
          </Radio.Group>
        </Modal>

        {/* 冻结账号时，填写冻结原因的浮层 */}
        <Modal title='请填写冻结的原因' visible={freezeVisible} onCancel={() => { this.setState({ freezeVisible: false, freeze_reason: '' }) }} onOk={this.freezeFn}>
          <Input.TextArea value={freeze_reason} placeholder='最多输入50个字' autoSize={{ minRows: 5, maxRows: 5 }} maxLength={50} onChange={(e) => { this.setState({ freeze_reason: e.target.value }) }}></Input.TextArea>
        </Modal>

        {/* 查询条件 */}
        <Form layout='inline' onSubmit={this.handleSubmitSearch}>
          <Form.Item label='搜索'>
            {
              getFieldDecorator('searchVal', {
                initialValue: ''
              })(
                <Input />
              )
            }
          </Form.Item>
          <Form.Item label='角色'>
            {
              getFieldDecorator('role', {
                initialValue: ''
              })(
                <Select style={{ width: 100 }}>
                  <Option value=''>全部</Option>
                  {
                    Object.values(dict.role_dict).map((item, index) => {
                      return <Option value={index} key={index}>{item}</Option>
                    })
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label='是否被冻结'>
            {
              getFieldDecorator('freeze_status', {
                initialValue: ''
              })(
                <Select style={{ width: 100 }}>
                  <Option value=''>全部</Option>
                  <Option value={0}>正常</Option>
                  <Option value={1}>冻结</Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label='VIP'>
            {
              getFieldDecorator('isVip', {
                initialValue: ''
              })(
                <Select style={{ width: 100 }}>
                  <Option value=''>全部</Option>
                  <Option value={1}>是</Option>
                  <Option value={0}>否</Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label='实名状态'>
            {
              getFieldDecorator('real_status', {
                initialValue: ''
              })(
                <Select style={{ width: 140 }}>
                  <Option value=''>全部</Option>
                  {
                    Object.values(dict.real_dict).map((item, index) => {
                      return <Option value={index} key={index}>{item}</Option>
                    })
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label='是否绑定了平台账号'>
            {
              getFieldDecorator('isPlatform', {
                initialValue: ''
              })(
                <Select style={{ width: 100 }}>
                  <Option value=''>全部</Option>
                  <Option value={1}>是</Option>
                  <Option value={0}>否</Option>
                </Select>
              )
            }
          </Form.Item>
          <br />
          <Form.Item label='注册时间'>
            {
              getFieldDecorator('create_time', {
                // initialValue: [moment('2015/01/01', 'YYYY/MM/DD'), moment('2015/01/02', 'YYYY/MM/DD')]
              })(
                <RangePicker format='YYYY/MM/DD'></RangePicker>
              )
            }
          </Form.Item>
          <Form.Item label='最后登录时间'>
            {
              getFieldDecorator('last_login_time', {
                // initialValue: [moment('2015/01/01', 'YYYY/MM/DD'), moment('2015/01/02', 'YYYY/MM/DD')]
              })(
                <RangePicker format='YYYY/MM/DD'></RangePicker>
              )
            }
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>查找</Button>
          </Form.Item>
        </Form>

        {/* 列表 */}
        <Table columns={columns} loading={tableLoading} scroll={{ x: true }} dataSource={data} pagination={{ current, showQuickJumper: true, onChange: this.changePage }}></Table>
      </div >
    )
  }
}

const UserForm = Form.create({})(User)

export default UserForm