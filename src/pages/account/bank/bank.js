import React from 'react'
import './index.scss'
// import { Link } from 'react-router-dom'
import { Form, Input, Select, Table, Button, Modal, message } from 'antd'
import Title from '@/components/title/title'

const { Option } = Select

// 审核状态字典
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

// 银行卡
let bankDict = {
  0: '添加银行卡',
  1: '修改银行卡'
}

const provinceData = ['Zhejiang', 'Jiangsu']
const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang']
}

class Bank extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false, // 点击按钮加载
      visible: false, // 添加，修改银行卡modal浮层的显示与隐藏
      bankOperation: 0, // 银行卡操作类型，0：添加，1：修改
      codeTime: 0, // 验证码倒计时

      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0],

      // 表单数据
      form: {
        bank_deposit: '0',
        bank_province: 0,
        bank_city: 0,
        bank_area: 0
      },

      // 银行卡头部信息
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          key: 'index',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
          align: 'center',
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
          title: '银行卡号',
          dataIndex: 'bank_num',
          key: 'bank_num',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          align: 'center',
          render: text => <span className={statusDict[text].class}>{statusDict[text].text}</span>
        },
        {
          title: '审核备注',
          dataIndex: 'reasion',
          key: 'reasion',
          align: 'center',
          render: text => <span className='error'>{text || '无'}</span>
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          align: 'center',
          render: (text, record) => <div>
            <Button className='bank-alter-btn' type='primary' size='small' onClick={this.showBank.bind(this, 1, record.id)}>修改</Button>
            <Button type='danger' size='small' onClick={this.delete}>删除</Button>
          </div>
        }
      ],
      // 公告数据
      data: []
    }
  }

  UNSAFE_componentWillMount() {

    // 获取公告数据
    let data = []
    for (let i = 1; i <= 3; i++) {
      data.push({
        key: i,
        index: i,
        type: '银行卡',
        name: '陈进帮',
        bank_num: '152456456746454878',
        status: 1,
        reasion: '姓名和开户行姓名不一致'
      })
    }
    this.setState({ data })
  }

  handleProvinceChange = value => {
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value[0]]
    })
  }

  onSecondCityChange = value => {
    this.setState({
      secondCity: value
    })
  }

  countDown() {
    console.log(11)

  }

  // 获取验证码
  getCode = () => {
    this.setState({
      codeTime: 60
    })

    let interval = window.setInterval(() => {
      if (this.state.codeTime === 0) {
        window.clearInterval(interval)
      } else {
        this.setState(state => ({
          codeTime: state.codeTime - 1
        }))
      }
    }, 1000)
  }

  delete = () => {
    // console.log(e)
    Modal.confirm({
      content: '是否删除该银行卡？',
      // okText: '删除',
      onOk: () => {
        message.success('删除银行卡成功')
      }
    })
  }

  // 显示添加，修改银行卡modal浮层
  showBank(bankOperation, id) {
    this.setState({
      bankOperation,
      visible: true
    })
  }

  // 关闭浮层
  onCancel = () => {
    // 重置表单
    this.props.form.resetFields()
    this.setState(state => ({
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
        this.setState({ loading: true })
      } else {
        // console.log(err)
        message.error(Object.values(err)[0].errors[0].message)
      }
    });
  }


  render() {
    const {
      loading, visible, bankOperation, codeTime,
      columns, data, cities
    } = this.state
    const { getFieldDecorator } = this.props.form

    return (
      <div className='bank'>
        <Title title='银行卡管理' />

        <Button className='bank-create-btn' type='primary' onClick={this.showBank.bind(this, 0)}>添加银行卡</Button>

        <Modal title={bankDict[bankOperation]} visible={visible} footer={null} onCancel={this.onCancel} maskClosable={false} width='700px'>
          <Form onSubmit={this.handleSubmit} labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
            <Form.Item label='开户行'>
              {
                getFieldDecorator('bank_deposit', {
                  initialValue: '0',
                  // validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '请选择开户行' }]
                })(
                  <Select style={{ width: 200 }} placeholder='请选择开户行'>
                    <Option value='0'>中国民生银行</Option>
                    <Option value='1'>中国建设银行</Option>
                    <Option value='2'>中国农业银行</Option>
                    <Option value='3'>中国工商银行</Option>
                  </Select>
                )
              }
            </Form.Item>
            <Form.Item label='选择省市'>
              {
                getFieldDecorator('bank_region', {
                  initialValue: provinceData[0],
                  // validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '请选择开户行' }]
                })(
                  <React.Fragment>
                    <Select style={{ width: 150 }} placeholder='请选择省市' onChange={this.handleProvinceChange}>
                      {
                        provinceData.map(province => (
                          <Option key={province}>{province}</Option>
                        ))
                      }
                    </Select>
                    <Select style={{ width: 150 }} value={this.state.secondCity} onChange={this.onSecondCityChange}>
                      {
                        cities.map(city => (
                          <Option key={city}>{city}</Option>
                        ))
                      }
                    </Select>
                  </React.Fragment>
                )
              }
            </Form.Item>
            <Form.Item label='开户支行名称'>
              {
                getFieldDecorator('bank_branch', {
                  // initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '请输入开户支行名称' }]
                })(
                  <Input placeholder='请输入开户支行名称' />
                )
              }
            </Form.Item>
            <Form.Item label='银行卡号'>
              {
                getFieldDecorator('bank_num', {
                  // initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '请输入银行卡号' }, { validator: /^([1-9]{1})(\d{14}|\d{18})$/, message: '请输入正确的银行卡格式' }]
                })(
                  <Input placeholder='请输入银行卡号' />
                )
              }
            </Form.Item>
            <Form.Item label='开户姓名'>
              {
                getFieldDecorator('name', {
                  // initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '请输入开户姓名' }, { pattern: /^([\u4E00-\u9FA5]+|[a-zA-Z]+)$/, message: '请输入有效的姓名' }]
                })(
                  <Input placeholder='请输入开户姓名' />
                )
              }
            </Form.Item>
            <Form.Item label='手机号'>
              {
                getFieldDecorator('mobile', {
                  // initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '请输入手机号' }, { pattern: /^(13[0-9]|14[5-9]|15[0-3,5-9]|16[2,5,6,7]|17[0-8]|18[0-9]|19[1,3,5,8,9])\d{8}$/, message: '请输入正确的手机号' }]
                })(
                  <Input placeholder='请输入手机号' />
                )
              }
            </Form.Item>
            <Form.Item label='验证码'>
              {
                getFieldDecorator('code', {
                  // initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '请输入验证码' }]
                })(
                  <Input className='mobile-code' placeholder='请输入验证码' />
                )
              }
              <Button type='dashed' onClick={this.getCode} disabled={codeTime}>{codeTime ? `倒计时(${codeTime}s)` : '获取验证码'}</Button>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6 }}>
              <Button type='primary' htmlType='submit' loading={loading}>提交审核</Button>
            </Form.Item>
          </Form>
        </Modal>

        <Table columns={columns} dataSource={data} pagination={false}></Table>
      </div>
    )
  }
}

const BankForm = Form.create({})(Bank)

export default BankForm;