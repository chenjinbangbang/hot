import React from 'react'
import './index.scss'
import axios from 'axios'
// import { Link } from 'react-router-dom'

import { Form, Input, Button, message } from 'antd'

import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'

@connect(
  state => state.user,
  { register }
)
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // form: {
      //   username: '',
      //   password: ''
      // },
      loading: false, // 登录按钮加载
    }
    // console.log(this.props.form)
  }

  // 表单数据的双向绑定
  // handleChange(key, e){
  //   e.preventDefault();
  //   const value = e.target.value;
  //   this.setState(state => ({
  //     form: { ...state.form, [key]: value }
  //   }))
  // }

  componentWillMount() {
    this.checkUsername()
  }


  // 密码校验
  validatePassword = (rule, value, callback) => {
    const { form } = this.props
    if (value) {
      // 校验并获取一组输入域的值与Error
      // 和确认密码必须一样，和安全密码必须不一样
      form.validateFields(['password_confirm', 'password_security'], { force: true })
    }
    callback()
  }

  // 确认密码校验
  validatePasswordConfirm = (rule, value, callback) => {
    const { form } = this.props

    if (value) {
      let reg = /^\w{6,18}$/
      if (!reg.test(value)) {
        callback('请输入8-18个字符的字母/数字/下划线组成的密码')
      } else {
        if (value !== form.getFieldValue('password')) {
          callback('密码和确认密码不一致')
        }
      }
    }
    callback()
  }

  // 安全密码校验
  validatePasswordSecurity = (rule, value, callback) => {
    const { form } = this.props
    if (value) {

      if (value === form.getFieldValue('password')) {
        callback('安全密码不能和密码相同')
      } else {
        // 校验并获取一组输入域的值与Error
        form.validateFields(['password_security_confirm'], { force: true })
      }
    }
    callback()
  }

  // 确认安全密码校验
  validatePasswordSecurityConfirm = (rule, value, callback) => {
    const { form } = this.props

    if (value) {
      let reg = /^\w{6,18}$/
      if (!reg.test(value)) {
        callback('请输入8-18个字符的字母/数字/下划线组成的密码')
      } else {
        if (value !== form.getFieldValue('password_security')) {
          callback('安全密码和确认安全密码不一致')
        }
      }
    }
    callback()
  }

  // 检查用户名是否已注册
  checkUsername = () => {
    axios.get('/check/username', { query: { username: '123' } }).then(res => {
      console.log(res)
      if (res.status === 200) {

      }
    })
  }

  // 提交表单
  handleSubmit = e => {
    e.preventDefault();
    // console.log(e, this.state.form, this.props.form)

    // console.log(this.props.form.getFieldsValue(['username']))
    // console.log(this.props.form.getFieldValue('username'))
    // this.props.form.getFieldValue('password')

    // 校验并获取一组输入域的值与Error，若fieldNames参数为空，则校验全部组件
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)

        // 登录接口
        this.setState({ loading: true })
        // setTimeout(() => {
        //   this.setState({ loading: false })
        //   message.success({
        //     content: '注册成功', duration: 2, onClose: () => {
        //       // this.props.history.push({ pathname: '/', state: { } })
        //     }
        //   })
        //   this.props.history.push({ pathname: '/' })
        // }, 500)
        this.props.register(values)
      } else {
        // console.log(err)
        message.error('请填写正确的信息')
      }
    });

  }

  render() {
    // console.log(this.state)
    // 经过getFieldDecorator包装的控件，表单控件会自动添加value（或valuePropName指定的其他属性）onChange（或trigger指定的其他属性），数据同步将被Form接管
    const { getFieldDecorator } = this.props.form
    const { loading } = this.state
    return (
      <div className='login'>

        <div className='login-title'>商家注册</div>

        <Form onSubmit={this.handleSubmit} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} className='login-form'>
          <Form.Item label='推荐人'>
            <p className='theme'>我的唯一</p>
          </Form.Item>
          <Form.Item label='用户名' hasFeedback>
            {
              getFieldDecorator('username', {
                initialValue: '',
                rules: [{ required: true, message: '请输入用户名' }, { pattern: /^\w{6,18}$/, message: '请输入6-18个字符的字母/数字/下划线组成的用户名' }]
              })(
                <Input placeholder='请输入用户名' />
              )
            }
          </Form.Item>
          <Form.Item label='密码' hasFeedback>
            {
              getFieldDecorator('password', {
                initialValue: '',
                rules: [{ required: true, message: '请输入密码' }, { pattern: /^\w{8,18}$/, message: '请输入8-18个字符的字母/数字/下划线组成的密码' }, { validator: this.validatePassword }]
              })(
                <Input.Password placeholder='请输入密码' />
              )
            }
          </Form.Item>
          <Form.Item label='确认密码' hasFeedback>
            {
              getFieldDecorator('password_confirm', {
                initialValue: '',
                rules: [{ required: true, message: '请再次输入密码' }, {
                  validator: this.validatePasswordConfirm
                }]
              })(
                <Input.Password placeholder='请输入确认密码' />
              )
            }
          </Form.Item>
          <Form.Item label='E-mail' hasFeedback>
            {
              getFieldDecorator('email', {
                initialValue: '',
                rules: [{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入正确的邮箱' }]
              })(
                <Input placeholder='请输入邮箱' />
              )
            }
          </Form.Item>
          <Form.Item label='联系QQ' hasFeedback>
            {
              getFieldDecorator('qq', {
                initialValue: '',
                rules: [{ required: true, message: '请输入QQ号' }, { pattern: /^[1-9]{1}[0-9]{4,11}$/, message: '请输入正确的QQ号' }]
              })(
                <Input placeholder='请输入QQ号' />
              )
            }
          </Form.Item>
          <Form.Item label='手机号' hasFeedback>
            {
              getFieldDecorator('mobile', {
                initialValue: '',
                rules: [{ required: true, message: '请输入手机号' }, { pattern: /^(13[0-9]|14[5-9]|15[0-3,5-9]|16[2,5,6,7]|17[0-8]|18[0-9]|19[1,3,5,8,9])\d{8}$/, message: '请输入正确的手机号' }]
              })(
                <Input placeholder='请输入手机号' />
              )
            }
          </Form.Item>
          <Form.Item label='安全密码' hasFeedback>
            {
              getFieldDecorator('password_security', {
                initialValue: '',
                rules: [{ required: true, message: '请输入安全密码' }, { pattern: /^\w{8,18}$/, message: '请输入8-18个字符的字母/数字/下划线组成的安全密码' }, { validator: this.validatePasswordSecurity }]
              })(
                <Input.Password placeholder='请输入安全密码' />
              )
            }
          </Form.Item>
          <Form.Item label='确认安全密码' hasFeedback>
            {
              getFieldDecorator('password_security_confirm', {
                initialValue: '',
                rules: [{ required: true, message: '请再次输入安全密码' }, {
                  validator: this.validatePasswordSecurityConfirm
                }]
              })(
                <Input.Password placeholder='请输入确认安全密码' />
              )
            }
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6 }}>
            {/* <p className='login-link'><Link className='link' to='/login'>前往登录</Link></p> */}
            <Button type='primary' htmlType='submit' block loading={loading}>立即注册</Button>
          </Form.Item>
        </Form>

      </div>
    )
  }
}

// 使用Form.create处理后的表单具有自动收集数据并校验的功能，但如果您不需要这个功能，或者默认的行为无法满足业务需求，可以选择不使用Form.create并自行处理数据
const RegisterForm = Form.create({})(Register)

export default RegisterForm