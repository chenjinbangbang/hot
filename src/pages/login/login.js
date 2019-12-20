import React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'

import { Form, Icon, Input, Button, message } from 'antd'; 

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // form: {
      //   username: '',
      //   pwd: ''
      // },
      loading: false // 登录按钮加载
    }
    // console.log(this.props)
  }

  // 表单数据的双向绑定
  // handleChange(key, e){
  //   e.preventDefault();
  //   const value = e.target.value;
  //   this.setState(state => ({
  //     form: { ...state.form, [key]: value }
  //   }))
  // }

  // 提交表单
  handleSubmit = e => {
    e.preventDefault();
    // console.log(e, this.state.form, this.props.form)

    // console.log(this.props.form.getFieldsValue(['username']))
    // console.log(this.props.form.getFieldValue('username'))
    // this.props.form.getFieldValue('pwd')

    // 校验并获取一组输入域的值与Error，若fieldNames参数为空，则校验全部组件
    this.props.form.validateFields((err, values) => {
      if(!err) {
        console.log(values)

        // 登录接口
        this.setState({ loading: true })
        setTimeout(() => {
          this.setState({ loading: false })
          message.success({ content: '登录成功', duration: 2, onClose: () => {
            // this.props.history.push({ pathname: '/', state: { } })
          } })
          this.props.history.push({ pathname: '/' })
        }, 500)
      } else {
        console.log(err)
        message.error('登录失败，用户名或密码输入错误')
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

        <div className='login-title'>登录</div>

        <Form onSubmit={this.handleSubmit} labelCol={{ span: 4 }}  wrapperCol={{ span: 20 }} className='login-form'>
          <Form.Item label='用户名'>
            {
              getFieldDecorator('username', {
                initialValue: 'dd',
                rules: [{required: true, message: '请输入用户名' }, { pattern: /^[\u4e00-\u9fa5\w]{6,18}$/, message: '请输入6-18个字符/字母/数字/下划线组成的用户名' }]
              })(
                <Input placeholder='请输入用户名' size='large' />
              )
            }
            {/* <Input value={form.username} defaultValue={form.username} prefix={<Icon type='user' style={{color: 'rgba(0,0,0,.25)'}} />} placeholder='请输入用户名' onChange={this.handleChange.bind(this, 'username')} size='large' /> */}
          </Form.Item>
          <Form.Item label='密码'>
            {
              getFieldDecorator('pwd', {
                initialValue: '1',
                rules: [{required: true, message: '请输入密码'}, { pattern: /^[\u4e00-\u9fa5\w]{8,18}$/, message: '请输入8-18个字符/字母/数字/下划线组成的密码' }]
              })(
                <Input type='password' placeholder='请输入密码' size='large' />
              )
            }
            {/* <Input value={form.pwd} defaultValue={form.pwd} prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}} /> } placeholder='请输入密码' onChange={this.handleChange.bind(this, 'pwd')} size='large' /> */}
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <p class='login-link'><Link className='link' to='/register'>前往注册</Link></p>
            <Button type='primary' htmlType='submit' size='large' block loading={loading}>登录</Button>
          </Form.Item>
        </Form>
        
      </div>
    )
  }
}

// 使用Form.create处理后的表单具有自动收集数据并校验的功能，但如果您不需要这个功能，或者默认的行为无法满足业务需求，可以选择不使用Form.create并自行处理数据
const LoginForm = Form.create({})(Login)

export default LoginForm