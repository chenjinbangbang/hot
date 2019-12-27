import React from 'react'
import './index.scss'
import { Button, Spin } from 'antd'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
    console.log(this);
  }

  render() {
    return (
      <div>
        <Spin size='large' />
        首页
        <Button type="primary">primary</Button>
      </div>
    )
  }
}

export default Home;