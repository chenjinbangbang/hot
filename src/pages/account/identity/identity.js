import React from 'react'
// import ReactDOM from 'react-dom'
import './index.scss'
// import { Link } from 'react-router-dom'
import { Form, Input, Button, message, Modal } from 'antd'
import Title from '@/components/title/title'

class Identity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false // 点击按钮加载
    }
  }

  UNSAFE_componentWillMount() {

  }

  // 提交表单
  handleSubmit = e => {
    e.preventDefault()

    // console.log(this.props.form.getFieldsValue(['username']))
    // console.log(this.props.form.getFieldValue('username'))
    // this.props.form.getFieldValue('password')

    // 校验并获取一组输入域的值与Error，若fieldNames参数为空，则校验全部组件
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)

        this.setState({ loading: true })
      } else {
        // console.log(err)
        message.error('登录失败，请填写正确的用户名和密码')
      }
    });

  }

  render() {
    const { loading } = this.state
    const { getFieldDecorator } = this.props.form
    return (
      <div className='identity'>
        <Title title='实名认证' />

        <div className='identity-note'>
          <p className='identity-note-status'>状态：<span>未实名认证</span></p>
          <p className='identity-note-detail'>为了加强对商家和用户的管理，避免有任务纠纷，请先通过实名认证才能接手任务请认真填写真实姓名，身份证号码，身份证正面，手持身份证半身照，完成实名认证。</p>
          <p>注意：一但提交并审核通过了就不能更改，请提交之前检查好</p>
        </div>

        <Form onSubmit={this.handleSubmit} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} className='login-form'>
          <Form.Item label='用户名' hasFeedback>
            {
              getFieldDecorator('username', {
                initialValue: 'jinbang',
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
                rules: [{ required: true, message: '请输入密码' }, { pattern: /^\w{8,18}$/, message: '请输入8-18个字符的字母/数字/下划线组成的密码' }]
              })(
                <Input.Password placeholder='请输入密码' />
              )
            }
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Button type='primary' htmlType='submit' block loading={loading}>登录</Button>
          </Form.Item>
        </Form>

      </div>
    )
  }
}

const IdentityForm = Form.create({})(Identity)

export default IdentityForm