import React from 'react'
import './index.scss'
// import { Link } from 'react-router-dom'
// import { Table } from 'antd'
import Title from '@/components/title/title'

class Tasklist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }

    // console.log(this.props)
  }

  // 表格分页
  // changePage = (page) => {
  //   this.setState({ current: page })
  // }

  render() {
    // const { columns, data, current } = this.state
    return (
      <div className='tasklist'>
        <Title title='任务列表' />


      </div>
    )
  }
}

export default Tasklist;