import React from 'react'
import './index.scss'
import { Route } from 'react-router-dom'
// import { Button, Spin } from 'antd'

import WealthDetail from '../wealth/wealth_detail/wealth_detail'
import Notice from '../account/notice/notice'
import NoticeDetail from '../account/notice_detail/notice_detail'
import Personal from '../account/personal/personal'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
    // console.log(this.props)
  }

  render() {
    // const { match } = this.props
    return (
      <div className='home'>

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