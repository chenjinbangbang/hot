import React from 'react'
import './index.scss'

class Title extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    // console.log(this.props)
  }

  render() {
    const { title } = this.props
    return (
      <div className='title'>{title}</div>
    )
  }
}

export default Title;