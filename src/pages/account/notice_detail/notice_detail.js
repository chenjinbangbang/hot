import React from 'react'
import './index.scss'
// import { Table } from 'antd'
import Title from '@/components/title/title'

class NoticeDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // content: '撤销退款，处理方法。  \n 请各位买家注意：'
    }
    // console.log(props)
  }

  escape2Html = (str) => {
    let arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' }
    console.log(str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; }))
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; })
  }

  render() {
    // const { content } = this.state
    const { title, time, content } = this.props.location.state
    return (
      <div className='notice-detail'>
        <Title title={title} />

        <p className='notice-detail-time'>时间：{time}</p>

        <span>{content}</span>

      </div>
    )
  }
}

export default NoticeDetail;