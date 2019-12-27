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
import { logout } from './redux/user.redux'
import AuthRoute from './components/authroute/authroute'

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { message, Menu, Dropdown, Icon } from 'antd'

import Home from './pages/home/home'
import Login from './pages/login/login'
import Register from './pages/register/register'
import WealthDetail from './pages/wealth/wealth_detail/wealth_detail'

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
    console.log(this.props)
    console.log(this)
  }

  // console.log(store.getState()) // 获取store的state
  // let username = store.getState().user.username

  // let username = '11'
  render() {
    const { username } = this.props

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
              <div className="logo-text"><Link to="/">LOGO设计</Link></div>
            </div>
          </div>

          <div className="content">
            <Switch>
              <Route path="/" exact component={Home}></Route>
              <Route path="/login" component={Login}></Route>
              <Route path="/register" component={Register}></Route>
              <Route path="/wealthdetail" component={WealthDetail}></Route>
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
