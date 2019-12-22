import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// import { loadData } from '../../redux/user.redux'

import { message } from 'antd'

// withRouter：把不是通过路由切换过来的组件中，将react-router中的history,location,match三个对象传入props对象上
// @withRouter
@connect(
  state => state.user,
  {}
)
class AuthRoute extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    // console.log(this.props)
  }

  componentDidMount() {
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    // console.log(pathname)

    // 判断是否登录，已登录时：若是登录页面，则跳转到首页，否则不跳转。未登录时：除了登录注册页面，其他页面都需要跳转到登录页面
    if (this.props.username) {
      // 已登录
      if (pathname === '/login') {
        this.props.history.push('/')
      }
    } else {
      // 未登录
      if (!publicList.includes(pathname)) {
        message.warning({
          content: '您还没有登录，请登录！', duration: 1, onClose: () => {
            this.props.history.push('/login')
          }
        })
      }
    }
  }

  render() {
    return (
      <div>
        {/* 当redirectTo变化时，就会执行 */}
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
      </div>
    )
  }
}

export default withRouter(AuthRoute)