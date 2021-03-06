import React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'
import { Table } from 'antd'
import Title from '@/components/title/title'

class Notice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 1, // 当前页
      // 公告头部信息
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          key: 'index',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '发送者',
          dataIndex: 'sender',
          key: 'sender',
          align: 'center',
          render: text => <span>{text === 0 && '系统管理员'}</span>
        },
        {
          title: '公告标题',
          dataIndex: 'title',
          key: 'title',
          align: 'center',
          render: (text, record) => <span><Link to={{ pathname: '/home/notice/detail', state: { title: record.title, time: record.time, content: record.content } }}>{text}</Link></span>
        },
        {
          title: '时间',
          dataIndex: 'time',
          key: 'time',
          align: 'center',
          render: text => <span>{text}</span>
        }
      ],
      // 公告数据
      data: []
    }
  }

  UNSAFE_componentWillMount() {

    // 获取公告数据
    let data = []
    for (let i = 1; i <= 200; i++) {
      data.push({
        key: i,
        index: i,
        sender: 0,
        title: '《待付款确认协议书》及签约须知',
        time: '2019-12-22 22:22:10',
        content: '《待付款确认协议书》及签约须知内容内容内容内容内容内容内容'
      })
    }
    this.setState({ data })

  }

  // 表格分页
  changePage = (page) => {
    this.setState({ current: page })
  }

  render() {
    const { columns, data, current } = this.state
    return (
      <div className='notice'>
        <Title title='公告' />

        <Table columns={columns} dataSource={data} pagination={{ current, showQuickJumper: true, onChange: this.changePage }}></Table>
      </div>
    )
  }
}

export default Notice;