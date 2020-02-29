// 二级页面的标题组件
import React from 'react'
import './index.scss'

class Title extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { title } = this.props
    return (
      <div className='title'>{title}</div>
    )
  }
}

export default Title