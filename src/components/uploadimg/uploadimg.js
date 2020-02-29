// 上传图片组件
import React from 'react'
import { Modal, Icon, Upload, message } from 'antd'
import './index.scss'

import { checkFile } from '@/util/api'

class UploadImg extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imgSrc: null, // modal预览图片路径
      imgVisible: false, // modal浮层的显示与隐藏
    }
  }

  // modal预览图片
  showImg(imgSrc) {
    this.setState({
      imgSrc,
      imgVisible: true
    })
  }

  // 删除图片
  deleteImg = (index) => {
    let { img_src } = this.props
    img_src.splice(index, 1)
    this.props.fileUpload(img_src)
  }

  // 上传图片
  fileUpload = (e) => {
    let { multiple, img_src, size } = this.props
    let files = this.refs.img_src.files

    // 是否是多选
    if (multiple) {
      // 最多可上传图片的数量
      if (img_src.length + files.length > size) {
        return message.warning(`最多上传${size}张图片`)
      }

      for (let i = 0; i < files.length; i++) {
        let file = files[i]
        // 上传文件，判断支持格式图片，支持则返回blob（src需要先调用上传文件的接口，返回图片路径url）
        let src = checkFile(file)
        img_src.push(src)
      }
      this.props.fileUpload(img_src)
    } else {
      let file = files[0]
      // 上传文件，判断支持格式图片，支持则返回blob（src需要先调用上传文件的接口，返回图片路径url）
      let src = checkFile(file)
      if (src) {
        this.props.fileUpload(src)
      }
    }
  }

  render() {
    const { imgSrc, imgVisible } = this.state
    const { img_src, isDetail, shape, multiple, size } = this.props
    return (
      <div className='upload-img'>

        {/* modal预览图片 */}
        <Modal visible={imgVisible} footer={null} onCancel={() => { this.setState({ imgVisible: false }) }}>
          <img src={imgSrc} style={{ width: '100%' }} alt='imgSrc' />
        </Modal>

        <input type='file' ref='img_src' multiple={multiple} onChange={this.fileUpload} style={{ position: 'fixed', top: '-1000px' }} />

        {
          // 是否是多选
          multiple ?
            <React.Fragment>
              <div className='file-multiple'>
                {
                  img_src.map((item, index) => {
                    return (
                      <div className='upload-img-file' key={index}>
                        <img src={item} alt='imgSrc' onClick={this.showImg.bind(this, item)} />
                        <div className='upload-img-icon'>
                          <Icon type="eye" onClick={this.showImg.bind(this, item)} />
                          {
                            // 详情时不显示
                            !isDetail &&
                            <Icon type="delete" onClick={this.deleteImg.bind(this, index)} />
                          }
                        </div>
                      </div>
                    )
                  })
                }
                {
                  // 不是详情，图片数量不能大于size数量时显示
                  (!isDetail && img_src.length < size) &&
                  <div className='upload-img-file'>
                    <Icon type="plus" onClick={() => { this.refs.img_src.click() }}></Icon>
                  </div>
                }
              </div>
            </React.Fragment>
            :
            <div className='upload-img-file' style={{ borderRadius: shape === 'circle' ? '50%' : '' }}>
              {
                img_src || isDetail ?
                  (
                    <React.Fragment>
                      <img src={img_src} alt='imgSrc' onClick={this.showImg.bind(this, img_src)} />
                      {
                        !isDetail && <div className='img-alter' onClick={() => { this.refs.img_src.click() }}>修改图片</div>
                      }
                    </React.Fragment>
                  )
                  :
                  <Icon type="plus" onClick={() => { this.refs.img_src.click() }} />
              }
            </div>
        }


      </div>
    )
  }
}

UploadImg.defaultProps = {
  img_src: '', // 图片链接
  isDetail: true, // 是否是详情不可编辑
  shape: 'square', // 样式，square：方形，circle：圆形
  multiple: false, // 是否可上传多张图片
  size: 1, // 最多可上传图片的数量
}

export default UploadImg