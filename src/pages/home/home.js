import React from 'react'
import './index.scss'
import { Menu, Icon } from 'antd'
import { Route } from 'react-router-dom'
// import { Button, Spin } from 'antd'

import WealthDetail from '../wealth/wealth_detail/wealth_detail'
import Notice from '../account/notice/notice'
import NoticeDetail from '../account/notice_detail/notice_detail'
import Personal from '../account/personal/personal'
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
    // console.log(this.props)
  }

  render() {
    // const { match } = this.props
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

        {/* <Link to={`${match.url}`}>财务明细 {match.url}</Link>
          <Link to={`${match.url}/notice`}>公告</Link> */}
        <div className='home-nav'>
          <Route path={`/`} component={Personal}></Route>
          <Route path={`/wealth/detail`} component={WealthDetail}></Route>
          <Route path={`/notice`} component={Notice}></Route>
          <Route path={`/notice/detail`} component={NoticeDetail}></Route>
          <Route path={`/personal`} component={Personal}></Route>
        </div>
      </div>
    )
  }
}

export default Home;