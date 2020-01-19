import React from 'react'
import './index.scss'
import { Menu, Icon } from 'antd'
import { Switch, Route } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { Button, Spin } from 'antd'

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
    // console.log(this.props.location.pathname)

    return (
      <div className='home'>
        <Menu theme='light' onClick={this.handleClick} defaultOpenKeys={['task', 'wealth', 'account']} selectedKeys={[this.props.location.pathname]} mode='inline' style={{ width: 160 }}>
          <SubMenu key='task' title={<span><Icon type="appstore" /><span>任务中心</span></span>}>
            <Menu.Item key='/home'>任务列表</Menu.Item>
            <Menu.Item key='/home/task/publish'>发布任务</Menu.Item>
            {/* <Menu.Item key='2'>任务教程</Menu.Item> */}
          </SubMenu>
          <SubMenu key='wealth' title={<span><Icon type="property-safety" /><span>钱包中心</span></span>}>
            <Menu.Item key='/home/pay'>充值</Menu.Item>
            <Menu.Item key='/home/buygold'>购买金币</Menu.Item>
            <Menu.Item key='/home/deposit'>提现</Menu.Item>
            <Menu.Item key='/home/wealth/detail'>财务明细</Menu.Item>
          </SubMenu>
          <SubMenu key='account' title={<span><Icon type="account-book" /><span>账号中心</span></span>}>
            <Menu.Item key='/home/personal'>个人信息</Menu.Item>
            <Menu.Item key='/home/identity'>实名认证</Menu.Item>
            <Menu.Item key='/home/bank'>银行卡管理</Menu.Item>
            <Menu.Item key='/home/platform'>账号管理</Menu.Item>
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