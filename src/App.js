import React from 'react'
// import logo from './logo.svg'
import './App.scss'
// import './util/tool.js'
// import './assets/css/basc.scss'

// createStore：创建一个Redux store来以存放应用中所有的state。应用中应有且仅有一个store
// import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import reducers from './redux/reducer'
// import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import { logout } from '@/redux/user.redux'
import AuthRoute from '@/components/authroute/authroute'

import { BrowserRouter as Router, Switch, Link, NavLink, Route } from 'react-router-dom'
import { message, Menu, Dropdown, Icon } from 'antd'

import Home from '@/pages/home/home'
import Login from '@/pages/login/login'
import Register from '@/pages/register/register'

// 后台管理
import UserAdmin from '@/pages/admin/user/user' // 用户管理
import TaskAdmin from '@/pages/admin/task/task' // 任务管理
import BankAdmin from '@/pages/admin/bank/bank' // 银行卡管理
import PlatformAdmin from '@/pages/admin/platform/platform' // 账号管理

// 任务中心 - 刷手
import Usertask from '@/pages/task/user_task/user_task' // 可接任务（刷手）
import Usertasklist from '@/pages/task/user_tasklist/user_tasklist' // 任务列表（刷手）
import Usertaskdetail from '@/pages/task/user_taskdetail/user_taskdetail' // 任务详情（刷手）

// 任务中心 - 创作者
import Tasklist from '@/pages/task/tasklist/tasklist' // 任务列表（创作者）
import Taskpublish from '@/pages/task/taskpublish/taskpublish' // 发布任务（创作者）
import Taskdetail from '@/pages/task/taskdetail/taskdetail' // 任务详情（创作者）

// 钱包中心
import Pay from '@/pages/wealth/pay/pay' // 充值
import Buygold from '@/pages/wealth/buygold/buygold' // 购买金币
import Deposit from '@/pages/wealth/deposit/deposit' // 财务明细
import WealthDetail from '@/pages/wealth/wealth_detail/wealth_detail' // 财务明细

// 账号中心
import Personal from '@/pages/account/personal/personal' // 个人信息
import Identity from '@/pages/account/identity/identity' // 实名认证
import Bank from '@/pages/account/bank/bank' // 银行卡管理
import Platform from '@/pages/account/platform/platform' // 账号管理
import Referrer from '@/pages/account/referrer/referrer' // 推广分享
import Notice from '@/pages/account/notice/notice' // 公告
import NoticeDetail from '@/pages/account/notice_detail/notice_detail' // 公告详情

// const store = createStore(reducers, applyMiddleware(thunk))

// 提示全局方法
message.config({ maxCount: 1 }) // maxCount：最大显示数，超过限制时，最早的消息会被自动关闭



// console.log(store)



@connect(
  state => state.user, // state放在props里
  { logout } // 方法放在props里，自动dispatch
)
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    // console.log(this.props)
    // console.log(this)
    // console.log(this)
  }

  // console.log(store.getState()) // 获取store的state
  // let username = store.getState().user.username

  // let username = '11'
  render() {
    const { username } = this.props
    // const pathname = this.props.location.pathname
    // console.log(this.props)

    // 路由
    const routes = [
      {
        path: '/admin',
        component: Home,
        routes: [
          // 后台管理
          {
            path: '/admin/user',
            component: UserAdmin
          },
          {
            path: '/admin/task',
            component: TaskAdmin
          },
          {
            path: '/admin/bank',
            component: BankAdmin
          },
          {
            path: '/admin/platform',
            component: PlatformAdmin
          }
        ]
      },
      {
        path: '/home',
        component: Home,
        routes: [

          // 任务中心 - 刷手
          {
            path: '/home/user/task',
            component: Usertask
          },
          {
            path: '/home/user/tasklist',
            component: Usertasklist
          },
          {
            path: '/home/user/taskdetail',
            component: Usertaskdetail
          },


          // 任务中心 - 创作者
          {
            path: '/home',
            component: Tasklist
          },
          {
            path: '/home/task/publish',
            component: Taskpublish
          },
          {
            path: '/home/task/detail',
            component: Taskdetail
          },

          // 钱包中心
          {
            path: '/home/deposit',
            component: Deposit
          },
          {
            path: '/home/pay',
            component: Pay
          },
          {
            path: '/home/buygold',
            component: Buygold
          },
          {
            path: '/home/wealth/detail',
            component: WealthDetail
          },

          // 账号中心
          {
            path: '/home/personal',
            component: Personal
          },
          {
            path: '/home/identity',
            component: Identity
          },
          {
            path: '/home/bank',
            component: Bank
          },
          {
            path: '/home/platform',
            component: Platform
          },
          {
            path: '/home/referrer',
            component: Referrer
          },
          {
            path: '/home/notice',
            component: Notice
          },
          {
            path: '/home/noticedetail',
            component: NoticeDetail
          }
        ]
      },
      {
        path: '/login',
        component: Login
      },
      {
        path: '/register',
        component: Register
      }
    ]

    // 登录菜单
    const menu = (
      <Menu onClick={this.props.logout}>
        <Menu.Item key='logout'>
          退出登录
        </Menu.Item>
      </Menu>
    )

    return (
      // <Provider store={store}>
      <div className="App">
        <Router>

          {/* {
            this.props.location.pathname.includes('/') &&
            <Redirect to='/home' />
          } */}

          <AuthRoute />

          <header className="header">
            <div className="header-contain">
              <ul>
                <li>
                  {username ?
                    <Dropdown overlay={menu}>
                      <div>您好！{username} <Icon type='down' /></div>
                    </Dropdown>
                    :
                    < Link to="/login">登录</Link>
                  }
                </li>
                <li><Link to="/register">注册</Link></li>
              </ul>
            </div>
          </header>

          <div className="logo">
            <div className="logo-contain">
              <div className="logo-text"><Link to="/home">LOGO设计</Link></div>
            </div>
          </div>

          <div className="nav">
            <div className="nav-contain">
              <ul>
                <li><NavLink to="/home" exact activeClassName="active">首页</NavLink></li>
                <li><NavLink to="/home/referrer" activeClassName="active">推广分享</NavLink></li>
              </ul>
            </div>
          </div>

          <div className="content">
            <Switch>
              {
                routes.map((item, key) => (
                  <Route key={key} path={item.path} render={props => (
                    <item.component {...props} routes={item.routes} />
                  )} />
                ))
              }
              {/* <Route path="/home" exact component={Home}></Route>
              <Route path="/login" component={Login}></Route>
              <Route path="/register" component={Register}></Route> */}
            </Switch>
          </div>
        </Router>

        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      </div>
      // </Provider >
    )
  }
}

// store.subscribe(App)

export default App;
