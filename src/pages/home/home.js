import React from 'react'
import './index.scss'
import { Menu, Icon } from 'antd'
import { Switch, Route } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { Button, Spin } from 'antd'

// 任务中心
// import Tasklist from '@/pages/task/tasklist/tasklist' // 任务列表

// // 钱包中心
// import WealthDetail from '@/pages/wealth/wealth_detail/wealth_detail' // 财务明细

// // 账号中心
// import Personal from '@/pages/account/personal/personal' // 个人信息
// import Notice from '@/pages/account/notice/notice' // 公告
// import NoticeDetail from '@/pages/account/notice_detail/notice_detail' // 公告详情

const { SubMenu } = Menu

// @connect(
//   state => state.user,
//   {}
// )
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: '1'
    }
    console.log(this.props)
    // console.log(this.context)
  }


  handleClick = ({ item, key, keyPath, domEvent }) => {
    // this.setState({
    //   current: e.key
    // })
    // console.log(this.props)
    // console.log(key, keyPath)
    // console.log(`${keyPath[1]}${keyPath[0]}`)
    this.props.history.push({ pathname: key })
  }

  render() {
    const { routes } = this.props
    return (
      <div className='home'>
        <Menu theme='light' onClick={this.handleClick} defaultOpenKeys={['task', 'wealth', 'account']} defaultSelectedKeys={[this.props.location.pathname]} mode='inline' style={{ width: 160 }}>
          <SubMenu key='task' title={<span><Icon type="appstore" /><span>任务中心</span></span>}>
            <Menu.Item key='/home'>任务列表</Menu.Item>
            {/* <Menu.Item key='2'>任务教程</Menu.Item> */}
          </SubMenu>
          <SubMenu key='wealth' title={<span><Icon type="property-safety" /><span>钱包中心</span></span>}>
            {/* <Menu.Item key='3'>金币兑现</Menu.Item>
            <Menu.Item key='4'>现金提现</Menu.Item> */}
            <Menu.Item key='/home/wealthdetail'>财务明细</Menu.Item>
          </SubMenu>
          <SubMenu key='account' title={<span><Icon type="account-book" /><span>账号中心</span></span>}>
            <Menu.Item key='/home/personal'>个人信息</Menu.Item>
            <Menu.Item key='/home/identity'>实名认证</Menu.Item>
            <Menu.Item key='/home/referrer'>推广分享</Menu.Item>
            <Menu.Item key='/home/notice'>公告</Menu.Item>
          </SubMenu>
        </Menu>

        {/* <Link to={`${match.url}`}>财务明细 {match.url}</Link>
          <Link to={`${match.url}/notice`}>公告</Link> */}
        <div className='home-nav'>
          <Switch>
            {
              routes.map((item, key) => (
                <Route key={key} path={item.path} exact render={props => (
                  <item.component {...props} />
                )} />
              ))
            }
          </Switch>
          {/* <Route path={``} component={Tasklist}></Route>

          <Route path={`/wealthdetail`} component={WealthDetail}></Route>

          <Route path={`/personal`} component={Personal}></Route>
          <Route path={`/notice`} component={Notice}></Route>
          <Route path={`/noticedetail`} component={NoticeDetail}></Route> */}

        </div>
      </div>
    )
  }
}

export default Home;