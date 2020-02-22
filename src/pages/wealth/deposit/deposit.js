/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
// import ReactDOM from 'react-dom'
import './index.scss'
// import { Link } from 'react-router-dom'
import { Form, Input, InputNumber, Button, Select, message, Tabs } from 'antd'
import Title from '@/components/title/title'

import { getRate } from '@/util/api'

const { TabPane } = Tabs
const { Option } = Select

class Deposit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false, // 点击按钮加载

      gold: 10, // 金币总计

      wealth: 100, // 现金总计
    }
  }

  UNSAFE_componentWillMount() {
  }

  changeTab = () => {
    this.props.form.resetFields()
  }

  // 兑换金币校验
  validatorGoldExchange = (rule, value, callback) => {
    if (value) {
      // if (value < 10) {
      //   callback('兑换金币必须大于等于10')
      // }
      if (value % 10 !== 0) {
        callback('兑换金币必须为10的倍数')
      }
    }
    callback()
  }

  // 提现金额校验
  validatorWealthDeposit = (rule, value, callback) => {
    if (value) {
      // if (value < 10) {
      //   callback('兑换金币必须大于等于10')
      // }
      if (value % 10 !== 0) {
        callback('提现金额必须为10的倍数')
      }
    }
    callback()
  }

  // 金币兑换提交表单
  handleSubmitGold = e => {
    e.preventDefault()

    // console.log(this.props.form.getFieldsValue(['username']))
    // console.log(this.props.form.getFieldValue('username'))
    // this.props.form.getFieldValue('password')
    // console.log('error: ', this.props.form.getFieldsError())

    // 校验并获取一组输入域的值与Error，若fieldNames参数为空，则校验全部组件
    this.props.form.validateFields(['gold_exchange', 'password_security'], (err, values) => {
      console.log(err, values)
      if (!err) {
        // this.setState({ loading: true })
        message.success('金币兑换成功')
      } else {
        // console.log(err)
        message.error(Object.values(err)[0].errors[0].message)
      }
    });
  }

  // 现金提现提交表单
  handleSubmitWealth = e => {
    e.preventDefault()

    // 校验并获取一组输入域的值与Error，若fieldNames参数为空，则校验全部组件
    this.props.form.validateFields(['wealth_deposit', 'bank_code', 'password_security1'], (err, values) => {
      console.log(err, values)
      if (!err) {
        // this.setState({ loading: true })
        message.success('提现成功')
      } else {
        // console.log(err)
        message.error(Object.values(err)[0].errors[0].message)
      }
    });
  }

  render() {
    const { loading, gold, wealth } = this.state
    const { getFieldDecorator } = this.props.form

    return (
      <div className='deposit'>
        <Title title='提现' />

        <Tabs onChange={this.changeTab} animated={false}>

          <TabPane tab='金币兑换' key='1'>
            <div className='deposit-note'>
              <p className='deposit-note-title'>金币总计：<span className='danger'>{gold.toFixed(2)}</span>个</p>
              <p><span className='danger'>10</span>金币起兑换，兑换金币数是<span className='danger'>10</span>的倍数</p>
              <p>VIP会员：<span className='danger'>1</span>金币=<span className='danger'>0.9</span>元。普通会员：<span className='danger'>1</span>金币 = <span className='danger'>0.8</span>元</p >
            </div >

            <Form onSubmit={this.handleSubmitGold} labelCol={{ span: 3 }} wrapperCol={{ span: 9 }} className='deposit-form'>
              <Form.Item label='兑换汇率'>
                <p><span className='danger'>{getRate()}</span>元/金币</p>
              </Form.Item>
              <Form.Item label='兑换金币'>
                {
                  getFieldDecorator('gold_exchange', {
                    initialValue: 10,
                    validateTrigger: 'onBlur',
                    rules: [{ required: true, message: '请输入兑换金币' }, { validator: this.validatorGoldExchange }]
                  })(
                    <InputNumber min={10} step={10} precistion={2} />
                  )
                }
              </Form.Item>
              <Form.Item label='安全密码' hasFeedback required>
                {
                  getFieldDecorator('password_security', {
                    initialValue: '',
                    validateTrigger: 'onBlur',
                    rules: [{ required: true, message: '请输入安全密码' }, { pattern: /^\w{8,18}$/, message: '请输入8-18个字符的字母/数字/下划线组成的安全密码' }]
                  })(
                    <Input.Password placeholder='请输入安全密码' />
                  )
                }
              </Form.Item>
              <Form.Item label='获得现金'>
                <p><span className='danger'>{(getRate() * this.props.form.getFieldValue('gold_exchange')).toFixed(2)}</span>元</p>
              </Form.Item >
              <Form.Item wrapperCol={{ offset: 3 }}>
                <Button type='primary' htmlType='submit' loading={loading}>提交审核</Button>
                <p className='danger'>若忘记密码可联系问题咨询客服QQ：2496028803</p>
              </Form.Item >
            </Form >

          </TabPane >


          <TabPane tab='现金提现' key='2'>

            <div className='deposit-note'>
              <p className='deposit-note-title'>现金总计：<span className='danger'>{wealth.toFixed(2)}</span>元</p>
              <p><span className='danger'>10</span>元起提现，提现金额是<span className='danger'>10</span>的倍数</p >
              <p>温馨提示：每天只能申请提现1次，提现按照银行处理的时间到账</p>
              <p>有问题联系财务客服，QQ：
                <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1653103050&site=qq&menu=yes">
                  <img border="0" src="http://wpa.qq.com/pa?p=2:1653103050:41" alt="财务-客服" title="财务-客服" />
                </a>
              </p>
            </div >

            <Form onSubmit={this.handleSubmitWealth} labelCol={{ span: 3 }} wrapperCol={{ span: 9 }} className='deposit-form'>
              <Form.Item label='提现金额'>
                {
                  getFieldDecorator('wealth_deposit', {
                    initialValue: 10,
                    validateTrigger: 'onBlur',
                    rules: [{ required: true, message: '请输入提现金额' }, { validator: this.validatorWealthDeposit }]
                  })(
                    <InputNumber min={10} step={10} precistion={2} />
                  )
                }
              </Form.Item>
              <Form.Item label='选择提现银行'>
                {
                  getFieldDecorator('bank_code', {
                    initialValue: '0',
                    // validateTrigger: 'onBlur',
                    rules: [{ required: true, message: '请选择提现银行' }]
                  })(
                    <Select style={{ width: 200 }} placeholder='请选择提现银行'>
                      <Option value='0'>中国民生银行</Option>
                      <Option value='1'>中国建设银行</Option>
                      <Option value='2'>中国农业银行</Option>
                      <Option value='3'>中国工商银行</Option>
                    </Select>
                  )
                }
              </Form.Item>
              <Form.Item label='手续费'>
                <p><span className='danger'>0</span>元</p>
              </Form.Item>
              <Form.Item label='安全密码' hasFeedback required>
                {
                  getFieldDecorator('password_security1', {
                    initialValue: '',
                    validateTrigger: 'onBlur',
                    rules: [{ required: true, message: '请输入安全密码' }, { pattern: /^\w{8,18}$/, message: '请输入8-18个字符的字母/数字/下划线组成的安全密码' }]
                  })(
                    <Input.Password placeholder='请输入安全密码' />
                  )
                }
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 3 }}>
                <Button type='primary' htmlType='submit' loading={loading}>提交审核</Button>
                <p className='danger'>若忘记密码可联系问题咨询客服QQ：2496028803</p>
              </Form.Item >
            </Form >
          </TabPane >
        </Tabs >


      </div >
    )
  }
}

const DepositForm = Form.create({})(Deposit)

export default DepositForm