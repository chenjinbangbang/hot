import React from 'react'
import './index.scss'
import { Menu, Icon } from 'antd'
const { SubMenu } = Menu

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: '1'
    }
    // console.log(this);
  }


  handleClick = e => {
    this.setState({
      current: e.key
    })
  }

  render() {
    return (
      <div className='home'>
        <Menu theme='light' onClick={this.handleClick} defaultOpenKeys={['sub1']} selectedKeys={[this.state.current]} mode='inline' style={{ width: 200 }}>
          <SubMenu key='sub1' title={<span><Icon type="appstore" /><span>任务中心</span></span>}>
            <Menu.Item key='1'>任务列表</Menu.Item>
            <Menu.Item key='2'>任务教程</Menu.Item>
          </SubMenu>
          <SubMenu key='sub2' title={<span><Icon type="property-safety" /><span>钱包中心</span></span>}>
            <Menu.Item key='3'>金币兑现</Menu.Item>
            <Menu.Item key='4'>现金提现</Menu.Item>
            <Menu.Item key='5'>财务明细</Menu.Item>
          </SubMenu>
          <SubMenu key='sub3' title={<span><Icon type="account-book" /><span>账号中心</span></span>}>
            <Menu.Item key='6'>推广分享</Menu.Item>
            <Menu.Item key='7'>日志管理</Menu.Item>
            <Menu.Item key='8'>账号管理</Menu.Item>
            <Menu.Item key='9'>个人信息</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}

export default Home;