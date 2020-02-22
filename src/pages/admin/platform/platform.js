import React from 'react'
import './index.scss'
// import { Link } from 'react-router-dom'
import { Form, Input, Select, Table, Button, Modal, message, DatePicker, Radio } from 'antd'
import Title from '@/components/title/title'
import UploadImg from '@/components/uploadimg/uploadimg'
import dict from '@/util/dict'

import userImg from '@/assets/imgs/user.jpg'

const { Option } = Select
const { RangePicker } = DatePicker


// 银行卡审核状态的样式
let bank_status_dict_class = {
  0: 'warning',
  1: 'danger',
  2: 'success',
  3: 'danger'
}

class Platform extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false, // 点击按钮加载
      platformInfo: {},

      reasonVisible: false, // 审核不通过的原因浮层的显示与隐藏
      reason: 0, // 审核不通过的原因

      freezeVisible: false, // 冻结的原因浮层的显示与隐藏
      freeze_reason: 0, // 冻结的原因 

      tableLoading: false, // 表格加载中
      current: 1, // 当前页
      // 银行卡头部信息
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          key: 'index',
          align: 'center',
          // fixed: 'left',
          render: text => <span>{text}</span>
        },
        {
          title: '编号',
          dataIndex: 'id',
          key: 'id',
          align: 'center',
          // fixed: 'left',
          render: text => <span>{text}</span>
        },
        {
          title: '用户名',
          dataIndex: 'username',
          key: 'username',
          align: 'center',
          // fixed: 'left',
          render: text => <span>{text}</span>
        },
        {
          title: '平台账号名称',
          dataIndex: 'platform_name',
          key: 'platform_name',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '平台类型',
          dataIndex: 'platform_type',
          key: 'platform_type',
          align: 'center',
          render: text => <span>{dict.platform_dict[text]}</span>
        },
        {
          title: '平台账号头像',
          dataIndex: 'platform_head_thumb',
          key: 'platform_head_thumb',
          align: 'center',
          render: text => <UploadImg isDetail={true} img_src={text || userImg} ></UploadImg>
        },
        {
          title: '平台账号截图',
          dataIndex: 'platform_image_src',
          key: 'platform_image_src',
          align: 'center',
          render: text => <UploadImg isDetail={true} img_src={text || userImg} ></UploadImg>
        },
        {
          title: '审核不通过原因',
          dataIndex: 'reason',
          key: 'reason',
          align: 'center',
          render: (text, record) => <span className='danger'>{record.status === 1 ? dict.platform_reason_dict[text] : ''}</span>
        },
        {
          title: '冻结原因',
          dataIndex: 'freeze_reason',
          key: 'freeze_reason',
          align: 'center',
          render: (text, record) => <span className='danger'>{record.status === 3 ? dict.platform_freeze_reason_dict[text] : ''}</span>
        },
        {
          title: '创建时间',
          dataIndex: 'create_time',
          key: 'create_time',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          align: 'center',
          // fixed: 'right',
          render: text => <span className={bank_status_dict_class[text]}>{dict.platform_status_dict[text]}</span>
        },
        {
          title: '审核',
          dataIndex: 'operation',
          key: 'operation',
          align: 'center',
          // fixed: 'right',
          render: (text, record) => <div>
            {
              // 状态为0时展示
              record.status === 0 &&
              <React.Fragment>
                <Button type='primary' size='small' style={{ marginRight: 10 }} onClick={this.checkConfirm.bind(this, record.id)}>通过</Button>
                <Button type='danger' size='small' onClick={this.showCheckFn.bind(this, record)}>不通过</Button>
              </React.Fragment>
            }
          </div>
        },
        {
          title: '操作',
          dataIndex: 'operation1',
          key: 'operation1',
          align: 'center',
          // fixed: 'right',
          render: (text, record) => <div>
            {
              // 状态为2时，表示正常，只展示冻结按钮
              record.status === 2 &&
              <Button size='small' onClick={this.showFreezeFn.bind(this, record)}>冻结</Button>
            }
            {
              // 状态为3时，表示冻结，只展示解冻按钮
              record.status === 3 &&
              <Button type='danger' size='small' onClick={this.unfreezeFn.bind(this, record.id, record.platform_name)}>解冻</Button>
            }
          </div>
        }
      ],
      // 公告数据
      data: []
    }
  }

  UNSAFE_componentWillMount() {

    // 序号，编号，用户名，平台账号名称，平台类型，平台账号头像，平台账号截图，状态，审核不通过原因，创建时间
    // 获取公告数据
    let data = []
    for (let i = 1; i <= 100; i++) {
      data.push({
        key: i,
        index: i,
        id: 10000 + i,
        username: '我的唯一',
        platform_name: '我的唯一',
        platform_type: Math.round(Math.random() * 3),
        platform_head_thumb: 'http://www.ixiupet.com/uploads/allimg/190110/278-1Z110162K1R2.png',
        platform_image_src: 'http://www.ixiupet.com/uploads/allimg/190110/278-1Z110162K1R2.png',
        status: Math.round(Math.random() * 3),
        reason: Math.round(Math.random() * 2),
        freeze_reason: Math.round(Math.random() * 1),
        create_time: '2019-12-22 22:22:10',
      })
    }
    this.setState({ data })
  }

  // ===================================== 审核 =====================================
  // 审核浮层的显示
  showCheckFn(record) {
    // console.log(record)

    this.setState({
      bankInfo: record,
      reasonVisible: true
    })
  }

  // 审核通过
  checkConfirm(id) {
    console.log(id)
    Modal.confirm({
      content: '审核是否通过？',
      onOk: () => {
        message.success('审核已通过')
      }
    })
  }

  // 审核不通过
  checkCancel = () => {
    // const { bankInfo, reason } = this.state
    // console.log(bankInfo, reason)
    message.warning('审核不通过')
    this.setState({
      reasonVisible: false,
      reason: 0 // 审核不通过的原因初始化
    })
  }

  // ===================================== 冻结，解冻 =====================================
  // 冻结浮层的显示
  showFreezeFn(record) {
    // console.log(record)

    this.setState({
      platformInfo: record,
      freezeVisible: true
    })
  }

  // 冻结账号
  freezeFn = () => {
    const { platformInfo, freeze_reason } = this.state
    console.log(platformInfo, freeze_reason)
    message.success(`${platformInfo.platform_name}已冻结`)
    this.setState({
      freezeVisible: false,
      freeze_reason: 0
    })
  }

  // 解冻账号
  unfreezeFn(id, val) {
    Modal.confirm({
      content: `是否要解冻${val}？`,
      onOk: () => {
        message.success(`${val}已解冻`)
      }
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

  // 表格分页
  changePage = (page) => {
    this.setState({ current: page })
  }

  render() {
    const {
      reasonVisible, reason,
      freezeVisible, freeze_reason,
      tableLoading, columns, data, current
    } = this.state
    const { getFieldDecorator } = this.props.form

    return (
      <div className='platform'>
        <Title title='账号管理' />

        {/* 审核不通过时，选择审核不通过原因的浮层 */}
        <Modal title='请选择审核不通过的原因' visible={reasonVisible} onCancel={() => { this.setState({ reasonVisible: false, reason: 0 }) }} onOk={this.checkCancel} width={400}>
          <Radio.Group value={reason} onChange={(e) => { this.setState({ reason: e.target.value }) }}>
            {
              Object.values(dict.platform_reason_dict).map((item, index) => {
                return <Radio style={{ display: 'block', marginTop: 20 }} value={index} key={index}>{item}</Radio>
              })
            }
          </Radio.Group>
        </Modal>

        {/* 冻结账号时，填写冻结原因的浮层 */}
        <Modal title='请填写冻结的原因' visible={freezeVisible} onCancel={() => { this.setState({ freezeVisible: false, freeze_reason: 0 }) }} onOk={this.freezeFn} width={300}>
          <Radio.Group value={freeze_reason} onChange={(e) => { this.setState({ freeze_reason: e.target.value }) }}>
            {
              Object.values(dict.platform_freeze_reason_dict).map((item, index) => {
                return <Radio style={{ display: 'block', marginTop: 20 }} value={index} key={index}>{item}</Radio>
              })
            }
          </Radio.Group>
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
          <Form.Item label='平台类型'>
            {
              getFieldDecorator('platform_type', {
                initialValue: ''
              })(
                <Select style={{ width: 140 }}>
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
          <Form.Item label='状态'>
            {
              getFieldDecorator('status', {
                initialValue: ''
              })(
                <Select style={{ width: 140 }}>
                  <Option value=''>全部</Option>
                  {
                    Object.values(dict.platform_status_dict).map((item, index) => {
                      return <Option value={index} key={index}>{item}</Option>
                    })
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label='审核不通过原因'>
            {
              getFieldDecorator('reason', {
                initialValue: ''
              })(
                <Select style={{ width: 250 }}>
                  <Option value=''>全部</Option>
                  {
                    Object.values(dict.platform_reason_dict).map((item, index) => {
                      return <Option value={index} key={index}>{item}</Option>
                    })
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label='冻结原因'>
            {
              getFieldDecorator('freeze_reason', {
                initialValue: ''
              })(
                <Select style={{ width: 140 }}>
                  <Option value=''>全部</Option>
                  {
                    Object.values(dict.platform_freeze_reason_dict).map((item, index) => {
                      return <Option value={index} key={index}>{item}</Option>
                    })
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label='创建时间'>
            {
              getFieldDecorator('create_time', {
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
        <Table columns={columns} loading={tableLoading} size='middle' scroll={{ x: true }} dataSource={data} pagination={{ current, showQuickJumper: true, onChange: this.changePage }}></Table>
      </div>
    )
  }
}

const PlatformForm = Form.create({})(Platform)

export default PlatformForm