import React from 'react'
import qs from 'qs'
import './index.scss'
// import { Link } from 'react-router-dom'
import { request } from '@/util/api'

import { Form, Input, Button, message, Radio, Tooltip, Icon } from 'antd'

import { connect } from 'react-redux'
import { register } from '@/redux/user.redux'

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
      referrer_user_id: '' // 师傅的user_id
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

  UNSAFE_componentWillMount() {
    // this.checkUsername()
    console.log(this.props)

    let search = this.props.location.search
    if (search) {
      console.log(qs.parse(search.replace('?', '')))
      let uid = qs.parse(search.replace('?', '')).uid
      this.setState({
        referrer_user_id: uid
      })
    }

  }

  // 用户名校验
  validateUsername = (rule, value, callback) => {
    console.log(value)
    if (value) {
      if (/^\w{6,18}$/.test(value)) {
        // 检查用户名是否已注册
        request('/check/username', 'get', { username: value }).then(res => {
          // console.log(res.msg)
          if (res.success) {
            callback()
          } else {
            callback(res.msg)
          }
        })
      } else {
        callback('请输入6-18个字符的字母/数字/下划线组成的用户名')
      }
    } else {
      callback('请输入用户名')
    }

  }

  // 检查用户名是否已注册
  // checkUsername = () => {
  //   request('/check/username', 'get', { username: '123' }).then(res => {
  //     console.log(res)
  //   })
  // }


  // 密码校验
  validatePassword = (rule, value, callback) => {
    const { form } = this.props
    if (value) {
      if (/^\w{8,18}$/.test(value)) {
        // 校验并获取一组输入域的值与Error
        // 密码和确认密码必须一样，和安全密码必须不一样
        form.validateFields(['password_confirm', 'password_security'], { force: true })
      } else {
        callback('请输入8-18个字符的字母/数字/下划线组成的密码')
      }

    } else {
      callback('请输入密码')
    }
    callback()
  }

  // 确认密码校验
  validatePasswordConfirm = (rule, value, callback) => {
    const { form } = this.props
    if (value) {
      if (/^\w{6,18}$/.test(value)) {
        if (value !== form.getFieldValue('password')) {
          callback('密码和确认密码不一致')
        }
      } else {
        callback('请输入8-18个字符的字母/数字/下划线组成的密码')
      }
    } else {
      callback('请再次输入密码')
    }
  }

  // 安全密码校验
  validatePasswordSecurity = (rule, value, callback) => {
    const { form } = this.props
    if (value) {
      if (/^\w{8,18}$/.test(value)) {
        if (value === form.getFieldValue('password')) {
          callback('安全密码不能和密码相同')
        } else {
          // 校验并获取一组输入域的值与Error
          form.validateFields(['password_security_confirm'], { force: true })
        }
      } else {
        callback('请输入8-18个字符的字母/数字/下划线组成的安全密码')
      }

    } else {
      callback('请输入安全密码')
    }
  }

  // 确认安全密码校验
  validatePasswordSecurityConfirm = (rule, value, callback) => {
    const { form } = this.props

    if (value) {
      if (/^\w{6,18}$/.test(value)) {
        if (value !== form.getFieldValue('password_security')) {
          callback('安全密码和确认安全密码不一致')
        }
      } else {
        callback('请输入8-18个字符的字母/数字/下划线组成的密码')
      }
    } else {
      callback('请再次输入安全密码')
    }
  }

  // 提交表单
  handleSubmit = e => {
    e.preventDefault()
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
    const { loading, referrer_user_id } = this.state
    return (
      <div className='login'>

        <div className='login-title'>用户注册</div>

        <Form onSubmit={this.handleSubmit} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} className='login-form'>
          <Form.Item label='推荐人'>
            <p className='theme'>{referrer_user_id || '无'}</p>
          </Form.Item>
          <Form.Item label='选择角色' required>
            {
              getFieldDecorator('role', {
                initialValue: 0,
              })(
                <Radio.Group buttonStyle='solid'>
                  <Radio.Button value={0}>刷手</Radio.Button>
                  <Radio.Button value={1}>创作者</Radio.Button>
                </Radio.Group>
              )
            }
            <Tooltip placement='top' title='刷手可接任务赚佣金，创作者可发布任务增加粉丝，角色选择后不可更改，请谨慎选择'>
              <Icon className='question-circle' type="question-circle" />
            </Tooltip>
          </Form.Item>
          <Form.Item label='用户名' hasFeedback>
            {
              getFieldDecorator('username', {
                initialValue: '',
                validateTrigger: 'onBlur',
                rules: [{ required: true, validator: this.validateUsername }]
              })(
                <Input placeholder='请输入用户名' />
              )
            }
          </Form.Item>
          <Form.Item label='密码' hasFeedback required>
            {
              getFieldDecorator('password', {
                initialValue: '',
                validateTrigger: 'onBlur',
                rules: [{ validator: this.validatePassword }]
              })(
                <Input.Password placeholder='请输入密码' />
              )
            }
          </Form.Item>
          <Form.Item label='确认密码' hasFeedback required>
            {
              getFieldDecorator('password_confirm', {
                initialValue: '',
                validateTrigger: 'onBlur',
                rules: [{
                  validator: this.validatePasswordConfirm
                }]
              })(
                <Input.Password placeholder='请再次输入密码' />
              )
            }
          </Form.Item>
          <Form.Item label='E-mail' hasFeedback>
            {
              getFieldDecorator('email', {
                initialValue: '',
                validateTrigger: 'onBlur',
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
                validateTrigger: 'onBlur',
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
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '请输入手机号' }, { pattern: /^(13[0-9]|14[5-9]|15[0-3,5-9]|16[2,5,6,7]|17[0-8]|18[0-9]|19[1,3,5,8,9])\d{8}$/, message: '请输入正确的手机号' }]
              })(
                <Input placeholder='请输入手机号' />
              )
            }
          </Form.Item>
          <Form.Item label='安全密码' hasFeedback required>
            {
              getFieldDecorator('password_security', {
                initialValue: '',
                validateTrigger: 'onBlur',
                rules: [{ validator: this.validatePasswordSecurity }]
              })(
                <Input.Password placeholder='请输入安全密码' />
              )
            }
          </Form.Item>
          <Form.Item label='确认安全密码' hasFeedback required>
            {
              getFieldDecorator('password_security_confirm', {
                initialValue: '',
                validateTrigger: 'onBlur',
                rules: [{
                  validator: this.validatePasswordSecurityConfirm
                }]
              })(
                <Input.Password placeholder='请再次输入安全密码' />
              )
            }
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6 }}>
            {/* <p className='login-link'><Link className='link' to='/login'>前往登录</Link></p> */}
            <Button type='primary' htmlType='submit' loading={loading}>立即注册</Button>
          </Form.Item>
        </Form>

      </div>
    )
  }
}

// 使用Form.create处理后的表单具有自动收集数据并校验的功能，但如果您不需要这个功能，或者默认的行为无法满足业务需求，可以选择不使用Form.create并自行处理数据
const RegisterForm = Form.create({})(Register)

export default RegisterForm