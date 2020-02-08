// 上传图片组件
import React from 'react'
import { Modal, Icon } from 'antd'
import './index.scss'

import { checkFile } from '@/util/api'

class UploadImg extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imgSrc: null, // modal预览图片路径
      imgVisible: false // modal浮层的显示与隐藏
    }
  }

  // modal预览图片
  showImg(imgSrc) {
    this.setState({
      imgSrc,
      imgVisible: true
    })
  }

  // 上传图片
  fileUpload = (e) => {
    let file = this.refs.img_src.files[0]

    // 上传文件，判断支持格式图片，支持则返回blob
    let src = checkFile(file)
    if (src) {
      this.props.fileUpload(src) // 这里src需要先调用上传文件的接口，返回图片路径url
    }
  }

  render() {
    const { imgSrc, imgVisible } = this.state
    const { img_src, isDetail, shape } = this.props
    return (
      <div className='upload-img'>

        {/* modal预览图片 */}
        <Modal visible={imgVisible} footer={null} onCancel={() => { this.setState({ imgVisible: false }) }}>
          <img src={imgSrc} style={{ width: '100%' }} alt='imgSrc' />
        </Modal>

        <div style={{ borderRadius: shape === 'circle' ? '50%' : '' }}>
          <input type='file' ref='img_src' onChange={this.fileUpload} style={{ position: 'fixed', top: '-1000px' }} />
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
              <Icon type="plus" onClick={() => { this.refs.img_src.click() }}></Icon>
          }
        </div>

      </div>
    )
  }
}

UploadImg.defaultProps = {
  img_src: '', // 图片链接
  isDetail: true, // 是否是详情不可编辑
  shape: 'square', // 样式，square：方形，circle：圆形
}

export default UploadImg