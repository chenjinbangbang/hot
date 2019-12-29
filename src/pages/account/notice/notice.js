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
      columns: [
        {
          title: '序号',
          dataIndex: 'id',
          key: 'id',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '发送者',
          dataIndex: 'sender',
          key: 'sender',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '公告标题',
          dataIndex: 'title',
          key: 'title',
          align: 'center',
          render: (text, record) => <span><Link to={{ pathname: '/noticedetail', state: { title: record.title, time: record.time, content: record.content } }}>{text}</Link></span>
        },
        {
          title: '时间',
          dataIndex: 'time',
          key: 'time',
          align: 'center',
          render: text => <span>{text}</span>
        }
      ],
      data: [
        {
          key: '1',
          id: '1',
          sender: '系统管理员',
          title: '《待付款确认协议书》及签约须知',
          time: '2019-12-22 22:22:10',
          content: '《待付款确认协议书》及签约须知内容内容内容内容内容内容内容'
        },
        {
          key: '2',
          id: '2',
          sender: '系统管理员',
          title: '《待付款确认协议书》及签约须知',
          time: '2019-12-22 22:22:10',
          content: '《待付款确认协议书》及签约须知内容内容内容内容内容内容内容'
        },
        {
          key: '3',
          id: '3',
          sender: '系统管理员',
          title: '《待付款确认协议书》及签约须知',
          time: '2019-12-22 22:22:10',
          content: '《待付款确认协议书》及签约须知内容内容内容内容内容内容内容'
        }
      ]
    }
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