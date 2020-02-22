import React from 'react'
import './index.scss'
import { Form, Button, Input, message } from 'antd'
import Title from '@/components/title/title'
import UploadImg from '@/components/uploadimg/uploadimg'

import userImg from '@/assets/imgs/user.jpg'

class Personal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loginLoading: false, // 修改登录密码按钮加载
      securityLoading: false, // 修改安全密码按钮加载

      // 用户信息
      userInfo: {
        head_thumb: ''
      },

      // head_thumb: null, // 头像
      // idcardVisible: false, // 头像预览图片modal显示与隐藏
    }
  }


  // 上传头像
  head_thumbFileUpload = (src) => {
    // let file = this.refs.head_thumb.files[0]

    // 上传文件，判断支持格式图片，支持则返回blob
    // let src = checkFile(file)
    // if (src) {
    //   this.setState(state => ({
    //     head_thumb: file,
    //     userInfo: { ...state.userInfo, head_thumb: src }
    //   }))
    // }
    this.setState(state => ({
      userInfo: { ...state.userInfo, head_thumb: src }
    }))
  }

  // ======================================== 修改登录密码表单 ========================================
  // 原登录密码校验
  validatePassword = (rule, value, callback) => {
    const { form } = this.props
    if (value) {
      if (/^\w{8,18}$/.test(value)) {
        // 校验并获取一组输入域的值与Error
        // 原登录密码和新登录密码必须不一样
        form.validateFields(['new_password'], { force: true })
      } else {
        callback('请输入8-18个字符的字母/数字/下划线组成的密码')
      }
    } else {
      callback('请输入原登录密码')
    }
    callback()
  }

  // 新登录密码校验
  validateNewPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value) {
      if (/^\w{6,18}$/.test(value)) {
        if (value === form.getFieldValue('password')) {
          callback('原登录密码不能和新登录密码相同')
        } else {
          // 新登录密码和确认新登录密码必须不一样
          form.validateFields(['new_password_confirm'], { force: true })
        }
      } else {
        callback('请输入8-18个字符的字母/数字/下划线组成的密码')
      }
    } else {
      callback('请输入新登录密码')
    }
    callback()
  }

  // 确认新登录密码校验
  validateNewPasswordConfirm = (rule, value, callback) => {
    const { form } = this.props
    if (value) {
      if (/^\w{6,18}$/.test(value)) {
        if (value !== form.getFieldValue('new_password')) {
          callback('新登录密码和确认新登录密码不一致')
        }
      } else {
        callback('请输入8-18个字符的字母/数字/下划线组成的密码')
      }
    } else {
      callback('请再次输入新登录密码')
    }
    callback()
  }

  // 点击修改登录密码
  alterPassword = e => {
    e.preventDefault()

    // 校验并获取一组输入域的值与Error，若fieldNames参数为空，则校验全部组件
    this.props.form.validateFields(['password', 'new_password', 'new_password_confirm'], (err, values) => {
      if (!err) {
        console.log(values)

        this.setState({ loginLoading: true })
      } else {
        message.error(Object.values(err)[0].errors[0].message)
      }
    });
  }

  // ======================================== 修改安全密码表单 ========================================
  // 原安全密码校验
  validatePasswordSecurity = (rule, value, callback) => {
    const { form } = this.props
    if (value) {
      if (/^\w{8,18}$/.test(value)) {
        // 校验并获取一组输入域的值与Error
        // 原安全密码和新安全密码必须不一样
        form.validateFields(['new_password_security'], { force: true })
      } else {
        callback('请输入8-18个字符的字母/数字/下划线组成的密码')
      }
    } else {
      callback('请输入原安全密码')
    }
    callback()
  }

  // 新安全密码校验
  validateNewPasswordSecurity = (rule, value, callback) => {
    const { form } = this.props
    if (value) {
      if (/^\w{6,18}$/.test(value)) {
        if (value === form.getFieldValue('password_security')) {
          callback('原安全密码不能和新安全密码相同')
        } else {
          // 新安全密码和确认新安全密码必须不一样
          form.validateFields(['new_password_security_confirm'], { force: true })
        }
      } else {
        callback('请输入8-18个字符的字母/数字/下划线组成的密码')
      }
    } else {
      callback('请输入新安全密码')
    }
    callback()
  }

  // 确认新安全密码校验
  validateNewPasswordSecurityConfirm = (rule, value, callback) => {
    const { form } = this.props
    if (value) {
      if (/^\w{6,18}$/.test(value)) {
        if (value !== form.getFieldValue('new_password_security')) {
          callback('新安全密码和确认新安全密码不一致')
        }
      } else {
        callback('请输入8-18个字符的字母/数字/下划线组成的密码')
      }
    } else {
      callback('请再次输入新安全密码')
    }
    callback()
  }

  // 点击修改安全密码
  alterPasswordSecurity = e => {
    e.preventDefault()

    // 校验并获取一组输入域的值与Error，若fieldNames参数为空，则校验全部组件
    this.props.form.validateFields(['password_security', 'new_password_security', 'new_password_security_confirm'], (err, values) => {
      console.log(values)
      if (!err) {
        // console.log(values)

        this.setState({ securityLoading: true })
      } else {
        message.error(Object.values(err)[0].errors[0].message)
      }
    });
  }

  render() {
    const { loginLoading, securityLoading, userInfo } = this.state
    const { getFieldDecorator } = this.props.form
    return (
      <div className='personal'>
        <Title title='个人信息' />

        <div className='personal-home'>
          <div className='personal-title'>基本资料</div>
          <div className='personal-info'>
            <UploadImg isDetail={false} img_src={userInfo.head_thumb || userImg} fileUpload={this.head_thumbFileUpload} shape='circle' ></UploadImg>
            {/* </Upload> */}
            <div className='personal-detail'>
              <ul>
                <li><span>角色：</span><span>刷手</span></li>
                <li><span>用户名：</span><span>陈进帮</span></li>
                <li><span>手机号：</span><span>13360502844</span></li>
                <li><span>联系QQ：</span><span>905690338</span></li>
                <li><span>注册时间：</span><span>2019-22-22 10:10:10</span></li>
                {/* <li><span>是否实名：</span><span>未实名，前去实名</span></li> */}
              </ul>
            </div>
          </div>
        </div>

        <div className='personal-home'>
          <div className='personal-title'>修改登录密码</div>
          <Form onSubmit={this.alterPassword} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item label='原登录密码' hasFeedback required>
              {
                getFieldDecorator('password', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [{ validator: this.validatePassword }]
                })(
                  <Input.Password placeholder='请输入原登录密码' />
                )
              }
            </Form.Item>
            <Form.Item label='新登录密码' hasFeedback required>
              {
                getFieldDecorator('new_password', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [{
                    validator: this.validateNewPassword
                  }]
                })(
                  <Input.Password placeholder='请输入新登录密码' />
                )
              }
            </Form.Item>
            <Form.Item label='确认新登录密码' hasFeedback required>
              {
                getFieldDecorator('new_password_confirm', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [{
                    validator: this.validateNewPasswordConfirm
                  }]
                })(
                  <Input.Password placeholder='请再次输入新登录密码' />
                )
              }
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8 }}>
              <Button type='primary' htmlType='submit' loading={loginLoading}>修改登录密码</Button>
            </Form.Item>
          </Form>
        </div>

        <div className='personal-home'>
          <div className='personal-title'>修改安全密码</div>
          <Form onSubmit={this.alterPasswordSecurity} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} className='login-form'>
            <Form.Item label='原安全密码' hasFeedback required>
              {
                getFieldDecorator('password_security', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [{ validator: this.validatePasswordSecurity }]
                })(
                  <Input.Password placeholder='请输入原安全密码' />
                )
              }
            </Form.Item>
            <Form.Item label='新安全密码' hasFeedback required>
              {
                getFieldDecorator('new_password_security', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [{
                    validator: this.validateNewPasswordSecurity
                  }]
                })(
                  <Input.Password placeholder='请输入新安全密码' />
                )
              }
            </Form.Item>
            <Form.Item label='确认新安全密码' hasFeedback required>
              {
                getFieldDecorator('new_password_security_confirm', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [{
                    validator: this.validateNewPasswordSecurityConfirm
                  }]
                })(
                  <Input.Password placeholder='请再次输入新安全密码' />
                )
              }
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8 }}>
              <Button type='primary' htmlType='submit' loading={securityLoading}>修改安全密码</Button>
            </Form.Item>
          </Form>
        </div>

      </div>
    )
  }
}

const PersonalForm = Form.create({})(Personal)

export default PersonalForm;