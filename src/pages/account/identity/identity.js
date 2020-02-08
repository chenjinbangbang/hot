import React from 'react'
// import ReactDOM from 'react-dom'
import './index.scss'
// import { Link } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import Title from '@/components/title/title'
import UploadImg from '@/components/uploadimg/uploadimg'

// import { checkFile } from '@/util/api'

class Identity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false, // 点击按钮加载

      // 用户信息
      userInfo: {
        isReal: false, // 是否实名认证
        name: '',
        idcardno: '',
        idcard_src: '',
        body_idcard_src: ''
      },

      // imgSrc: null, // modal预览图片路径
      // imgVisible: false, // modal浮层的显示与隐藏

      // idcard_src: null, // 身份证正面（file对象格式）
      // body_idcard_src: null, // 手持身份证半身照（file对象格式）
    }
  }

  UNSAFE_componentWillMount() {

  }

  // modal预览图片
  // showImg(imgSrc) {
  //   this.setState({
  //     imgSrc,
  //     imgVisible: true
  //   })
  // }

  // 上传身份证正面
  idcardFileUpload = (src) => {
    console.log(src)
    // let file = this.refs.idcard_src.files[0]

    // // 上传文件，判断支持格式图片，支持则返回blob
    // let src = checkFile(file)
    // if (src) {
    //   this.setState(state => ({
    //     idcard_src: file,
    //     userInfo: { ...state.userInfo, idcard_src: src }
    //   }))
    // }
    this.setState(state => ({
      userInfo: { ...state.userInfo, idcard_src: src }
    }))
  }

  // 上传手持身份证半身照
  body_idcardFileUpload = (src) => {
    // let file = this.refs.body_idcard_src.files[0]

    // // 上传文件，判断支持格式图片，支持则返回blob
    // let src = checkFile(file)
    // if (src) {
    //   this.setState(state => ({
    //     body_idcard_src: file,
    //     userInfo: { ...state.userInfo, body_idcard_src: src }
    //   }))
    // }
    this.setState(state => ({
      userInfo: { ...state.userInfo, body_idcard_src: src }
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

        // 判断是否上传身份证正面和手持身份证半身照
        if (!this.state.userInfo.idcard_src) {
          return message.error('请上传身份证正面')
        }
        if (!this.state.userInfo.body_idcard_src) {
          return message.error('请上传手持身份证半身照')
        }

        this.setState({ loading: true })
      } else {
        // console.log(err)
        message.error(Object.values(err)[0].errors[0].message)
      }
    });
  }

  render() {
    const { loading, userInfo } = this.state
    const { getFieldDecorator } = this.props.form

    return (
      <div className='identity'>
        <Title title='实名认证' />

        <div className='identity-note'>
          <p className='identity-note-status'>状态：{userInfo.isReal ? <span className='success'>已实名</span> : <span className='error'>未实名认证</span>}</p>
          <p className='identity-note-detail'>为了加强对创作者和刷手的管理，避免有任务纠纷，请先通过实名认证才能发布/接手任务。请认真填写真实姓名，身份证号码，身份证正面，手持身份证半身照，完成实名认证。</p>
          <p>注意：一但提交审核通过了就不能更改，请提交之前检查好</p>
        </div>

        {/* modal预览图片 */}
        {/* <Modal visible={imgVisible} footer={null} onCancel={() => { this.setState({ imgVisible: false }) }}>
          <img src={imgSrc} style={{ width: '100%' }} alt='imgSrc' />
        </Modal> */}

        <div className='identity-form'>
          <div className='identity-form-title'>实名认证</div>
          <Form onSubmit={this.handleSubmit} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} className='login-form'>
            <Form.Item label='真实姓名' hasFeedback>
              {
                getFieldDecorator('name', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '请输入真实姓名' }, { pattern: /^([\u4E00-\u9FA5]+|[a-zA-Z]+)$/, message: '请输入有效的姓名' }]
                })(
                  userInfo.isReal ?
                    <p>{userInfo.name}</p>
                    :
                    <Input placeholder='请输入真实姓名，真实姓名与身份证的姓名保持一致' />
                )
              }
            </Form.Item>
            <Form.Item label='身份证号码' hasFeedback>
              {
                getFieldDecorator('idcardno', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '请输入身份证号码' }, { pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/, message: '请输入有效的身份证号码' }]
                })(
                  userInfo.isReal ?
                    <p>{userInfo.idcardno}</p>
                    :
                    <Input placeholder='请输入身份证号码' />
                )
              }
            </Form.Item>
            <Form.Item label='身份证正面' required>
              <div className='file-src'>
                {/* <div>
                  <input type='file' ref='idcard_src' onChange={this.idcardFileUpload} style={{ position: 'fixed', top: '-1000px' }} />
                  {
                    userInfo.idcard_src || userInfo.isReal ?
                      (
                        <React.Fragment>
                          <img src={userInfo.idcard_src} alt='imgSrc' onClick={this.showImg.bind(this, userInfo.idcard_src)} />
                          {
                            !userInfo.isReal && <div className='img-alter' onClick={() => { this.refs.idcard_src.click() }}>修改图片</div>
                          }
                        </React.Fragment>
                      )
                      :
                      <Icon type="plus" onClick={() => { this.refs.idcard_src.click() }}></Icon>
                  }
                </div> */}
                <UploadImg isDetail={userInfo.isReal} img_src={userInfo.idcard_src} fileUpload={this.idcardFileUpload} ></UploadImg>
                <p className='text-example'>身份证可用文字写上"仅供点点赚审核使用"</p>
              </div>
            </Form.Item>
            <Form.Item label='手持身份证半身照' required>
              <div className='file-src'>
                {/* <div>
                  <input type='file' ref='body_idcard_src' onChange={this.body_idcardFileUpload} style={{ position: 'fixed', top: '-1000px' }} />
                  {
                    userInfo.body_idcard_src || userInfo.isReal ?
                      (
                        <React.Fragment>
                          <img src={userInfo.body_idcard_src} alt='body_img_src' onClick={this.showImg.bind(this, userInfo.body_idcard_src)} />
                          {
                            !userInfo.isReal && <div className='img-alter' onClick={() => { this.refs.body_idcard_src.click() }}>修改图片</div>
                          }
                        </React.Fragment>
                      )
                      :
                      <Icon type="plus" onClick={() => { this.refs.body_idcard_src.click() }}></Icon>
                  }
                </div> */}
                <UploadImg isDetail={userInfo.isReal} img_src={userInfo.body_idcard_src} fileUpload={this.body_idcardFileUpload} ></UploadImg>

                <p className='text-example'>要求身份证信息清晰可见，照片中露出手臂，可用文字写上"仅供点点赚审核使用"</p>
              </div>
            </Form.Item>
            {
              !userInfo.isReal &&
              <Form.Item wrapperCol={{ offset: 8 }}>
                <Button type='primary' htmlType='submit' loading={loading}>提交审核</Button>
              </Form.Item>
            }

          </Form>




        </div>



      </div >
    )
  }
}

const IdentityForm = Form.create({})(Identity)

export default IdentityForm