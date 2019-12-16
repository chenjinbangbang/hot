import React from 'react';
import './index.scss';
import { Button } from 'antd';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  render() {
    return (
      <div>
        首页
        <Button type="primary">primary</Button>
      </div>
    )
  }
}

export default Home;