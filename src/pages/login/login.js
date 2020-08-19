import React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'
import { Form, Input, Button, message, Modal } from 'antd'
import { request } from '@/util/api'

import { connect } from 'react-redux'
import { login } from '@/redux/user.redux'
// import { addGun, removeGun, addGunAsync } from '@/redux/index.redux'

@connect(
  state => state.user,
  // { login, addGun, removeGun, addGunAsync }
  { login }
)
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // form: {
      //   username: '',
      //   password: ''
      // },
      loading: false // 登录按钮加载
    }
    // console.log('login：', this.props)
  }

  UNSAFE_componentWillMount() { 
    request('/auth/login', 'post', { username: 'xx', password: 'yy' }).then(res => { 
      console.log(res)
    }) 
  }

  componentDidMount() { 
    
  }

  // 表单数据的双向绑定
  // handleChange(key, e){
  //   e.preventDefault();
  //   const value = e.target.value;
  //   this.setState(state => ({
  //     form: { ...state.form, [key]: value }
  //   }))
  // }

  // 忘记密码
  forgetPwd() {
    Modal.info({
      content: <p>若忘记密码，请使用绑定的QQ联系在线客服处理，客服QQ：<span className='theme'>1312480793</span></p>,
      okText: '确定'
    })
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
        //     content: '登录成功', duration: 2, onClose: () => {
        //       // this.props.history.push({ pathname: '/', state: { } })
        //     }
        //   })
        //   this.props.history.push({ pathname: '/' })
        // }, 500)
        this.props.login(values)

      } else {
        // console.log(err)
        message.error('登录失败，用户名或密码输入格式有误！')
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

        {/* {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null} */}

        {/* <div>现在有机关枪：{this.props.counter}</div>
        <Button onClick={this.props.addGun}>申请武器</Button>
        <Button onClick={this.props.removeGun}>上交武器</Button>
        <Button onClick={this.props.addGunAsync}>拖两天再给</Button> */}

        <div className='login-title'>用户登录</div>

        <Form onSubmit={this.handleSubmit} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} className='login-form'>
          <Form.Item label='用户名' hasFeedback>
            {
              getFieldDecorator('username', {
                initialValue: 'jinbang',
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '请输入用户名' }, { pattern: /\w{6,18}$/, message: '请输入6-18个字符的字母/数字/下划线组成的用户名' }]
              })(
                <Input placeholder='请输入用户名' />
              )
            }
          </Form.Item>
          <Form.Item label='密码' hasFeedback>
            {
              getFieldDecorator('password', {
                initialValue: '12345678',
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '请输入密码' }, { pattern: /^\w{8,18}$/, message: '请输入8-18个字符的字母/数字/下划线组成的密码' }]
              })(
                <Input.Password placeholder='请输入密码' />
              )
            }
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <p className='login-link'>
              <span onClick={this.forgetPwd}>忘记密码？</span>
              <Link className='link' to='/register'>前往注册</Link>
            </p>
            <Button type='primary' htmlType='submit' loading={loading}>登录</Button>
          </Form.Item>
        </Form>

      </div>
    )
  }
}

// 使用Form.create处理后的表单具有自动收集数据并校验的功能，但如果您不需要这个功能，或者默认的行为无法满足业务需求，可以选择不使用Form.create并自行处理数据
const LoginForm = Form.create({})(Login)

export default LoginForm