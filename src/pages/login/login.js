import React from 'react';
import './index.scss';

import { Form, Icon, Input, Button } from 'antd'; 

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: '',
        pwd: ''
      }
    }
    console.log(this.state)
  }

  // 表单数据的双向绑定
  handleChange(key, e){
    e.preventDefault();
    const value = e.target.value;
    this.setState(state => ({
      form: { ...state.form, [key]: value }
    }))
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        console.log(values)
      }
    });
  }

  render() {
    // console.log(this.state)
    // const { getFieldDecorator } = this.props.form;
    const { form } = this.state;
    return (
      <div className='login'>

        <div className='login-title'>登录</div>

        <Form onSubmit={this.handleSubmit} className='login-form'>
          <Form.Item>
            {/* {
              getFieldDecorator('username', {
                rules: [{required: true, message: '请输入用户名'}]
              })(
                <Input prefix={<Icon type='user' style={{color: 'rgba(0,0,0,.25)'}} />} placeholder="用户名"  />
              )
            } */}
            <Input defaultValue={form.username} prefix={<Icon type='user' style={{color: 'rgba(0,0,0,.25)'}} />} placeholder='请输入用户名' onChange={this.handleChange.bind(this, 'username')} />
            <Input defaultValue={form.pwd} prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}} /> } placeholder='请输入密码' onChange={this.handleChange.bind(this, 'pwd')} />
          </Form.Item>
        </Form>
        {/* {JSON.stringify(form)} */}
        
      </div>
    )
  }
}

export default Login;