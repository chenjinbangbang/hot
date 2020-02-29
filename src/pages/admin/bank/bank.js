import React from 'react'
import './index.scss'
// import { Link } from 'react-router-dom'
import { Form, Input, Select, Table, Button, Modal, message, DatePicker, Radio } from 'antd'
import Title from '@/components/title/title'
import dict from '@/util/dict'

const { Option } = Select
const { RangePicker } = DatePicker

// 银行卡审核状态的样式
let bank_status_dict_class = {
  0: 'warning',
  1: 'danger',
  2: 'success'
}

class Bank extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false, // 点击按钮加载
      bankInfo: {}, // 某个银行卡的数据

      reasonVisible: false, // 审核不通过的原因浮层的显示与隐藏
      reason: 0, // 审核不通过的原因

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
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '开户行',
          dataIndex: 'bank_deposit',
          key: 'bank_deposit',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '开户地址',
          dataIndex: 'bank_address',
          key: 'bank_address',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '支行名称',
          dataIndex: 'bank_branch',
          key: 'bank_branch',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '银行卡号',
          dataIndex: 'bank_num',
          key: 'bank_num',
          align: 'center',
          render: text => <span>{text}</span>
        },

        {
          title: '审核不通过原因',
          dataIndex: 'reason',
          key: 'reason',
          align: 'center',
          render: (text, record) => <span className='danger'>{record.status === 1 ? dict.bank_reason_dict[text] : ''}</span>
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
          render: text => <span className={bank_status_dict_class[text]}>{dict.bank_status_dict[text]}</span>
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
        }
      ],
      // 公告数据
      data: []
    }
  }

  UNSAFE_componentWillMount() {

    // 序号，编号，用户名，姓名，开户行，开户地址（省市区），支行名称，银行卡号，状态，审核备注，创建时间
    // 获取公告数据
    let data = []
    for (let i = 1; i <= 100; i++) {
      data.push({
        key: i,
        index: i,
        id: 10000 + i,
        username: '我的唯一',
        name: '陈进帮',
        bank_deposit_id: 1,
        bank_deposit: '兴业银行',
        bank_address: '广东省 深圳市 罗湖区',
        bank_branch: '深圳支行',
        bank_num: '152456456746454878',
        status: Math.round(Math.random() * 2),
        reason: Math.round(Math.random() * 3),
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
      tableLoading, columns, data, current
    } = this.state
    const { getFieldDecorator } = this.props.form

    return (
      <div className='bank'>
        <Title title='银行卡管理' />

        {/* 审核不通过时，选择审核不通过原因的浮层 */}
        <Modal className='modal-reason-style' title='请选择审核不通过的原因' visible={reasonVisible} onCancel={() => { this.setState({ reasonVisible: false, reason: 0 }) }} onOk={this.checkCancel} width={400}>
          <Radio.Group value={reason} onChange={(e) => { this.setState({ reason: e.target.value }) }}>
            {
              Object.values(dict.bank_reason_dict).map((item, index) => {
                return <Radio value={index} key={index}>{item}</Radio>
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
          <Form.Item label='状态'>
            {
              getFieldDecorator('status', {
                initialValue: ''
              })(
                <Select style={{ width: 140 }}>
                  <Option value=''>全部</Option>
                  {
                    Object.values(dict.bank_status_dict).map((item, index) => {
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
                    Object.values(dict.bank_reason_dict).map((item, index) => {
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

const BankForm = Form.create({})(Bank)

export default BankForm