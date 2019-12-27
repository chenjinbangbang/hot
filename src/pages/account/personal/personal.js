import React from 'react'
import './index.scss'
import { Icon, Form, Button, Input } from 'antd'
import Title from '../../../components/title/title'

import userImg from '../../../assets/imgs/user.jpg'

class Personal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loginLoading: false // 修改登录密码按钮加载
    }
  }

  render() {
    // const { content } = this.state
    const { getFieldDecorator } = this.props.form
    return (
      <div className='personal'>
        <Title title='个人信息' />

        <div className='personal-home'>
          <div className='personal-title'>基本资料</div>
          <div className='personal-info'>
            <div className='personal-avatar'>
              <div className='avatar-alter'><Icon type='camera' /></div>
              <img src={userImg} alt='' />
            </div>
            <div className='personal-detail'>
              <ul>
                <li><span>角色：</span><span>用户</span></li>
                <li><span>用户名：</span><span>陈进帮</span></li>
                <li><span>手机号：</span><span>13360502844</span></li>
                <li><span>联系QQ：</span><span>905690338</span></li>
                <li><span>注册时间：</span><span>2019-22-22 10:10:10</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className='personal-home'>
          <div className='personal-title'>修改登录密码</div>
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
          {/* <Form.Item label='安全密码' hasFeedback>
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
          </Form.Item> */}
          <Form.Item wrapperCol={{ offset: 6 }}>
            {/* <p className='login-link'><Link className='link' to='/login'>前往登录</Link></p> */}
            <Button type='primary' htmlType='submit' block loading={loading}>立即注册</Button>
          </Form.Item>
        </Form>
        </div>

      </div>
    )
  }
}

const PersonalForm = Form.create({})(Personal)

export default PersonalForm;