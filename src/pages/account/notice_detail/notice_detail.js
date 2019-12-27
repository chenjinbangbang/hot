import React from 'react'
import './index.scss'
// import { Table } from 'antd'
import Title from '../../../components/title/title'

class NoticeDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '撤销退款，及冻结用户，处理方法。  \n 请各位买家注意：'
    }
  }

  escape2Html = (str) => {
    let arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' }
    console.log(str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function(all, t) { return arrEntities[t]; }))
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function(all, t) { return arrEntities[t]; })
  }

  render() {
    const { content } = this.state
    return (
      <div className='notice-detail'>
        <Title title='公告详情' />

        <p className='notice-detail-time'>时间：2019-12-12 22:22:22</p>

        <span>{content}</span>

      </div>
    )
  }
}

export default NoticeDetail;