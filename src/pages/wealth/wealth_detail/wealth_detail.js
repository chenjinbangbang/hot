import React from 'react'
import './index.scss'
import { Table } from 'antd'

class WealthDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 1, //当前页
      columns: [
        {
          title: '编号',
          dataIndex: 'id',
          key: 'id',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '时间',
          dataIndex: 'time',
          key: 'time',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '详情',
          dataIndex: 'detail',
          key: 'detail',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '现金变化',
          dataIndex: 'change_wealth',
          key: 'change_wealth',
          align: 'center',
          render: (text, record, index) => <span className={record.change_wealth_type === 0 ? 'red' : 'success'}>{record.change_wealth_type === 0 ? '-' : '+'}{text}</span>
        },
        {
          title: '剩余现金',
          dataIndex: 'balance',
          key: 'balance',
          align: 'center',
          render: text => <span>{text}</span>
        }
      ],
      data: [
        {
          key: '1',
          id: '1',
          time: '2019-12-22 22:22:10',
          type: '金币兑换现金',
          detail: '提现金币成功，已转入平台现金账户',
          change_wealth: 360.5,
          change_wealth_type: 0,
          balance: 2000.88,
        },
        {
          key: '2',
          id: '2',
          time: '2019-12-22 22:22:10',
          type: '金币兑换现金',
          detail: '提现金币成功，已转入平台现金账户',
          change_wealth: 360.5,
          change_wealth_type: 1,
          balance: 2000.88,
        },
        {
          key: '3',
          id: '3',
          time: '2019-12-22 22:22:10',
          type: '金币兑换现金',
          detail: '提现金币成功，已转入平台现金账户',
          change_wealth: 100.20,
          change_wealth_type: 1,
          balance: 2000.88,
        }

      ]
    }
    // console.log(this.props.location);
  }

  // 表格分页
  changePage = (page, pageSize) => {
    this.setState({ current: page })
  }

  render() {
    const { columns, data, current } = this.state
    return (
      <div className='wealth-detail'>
        <div className='title'>财务明细</div>

        <Table columns={columns} dataSource={data} pagination={{current, defaultPageSize: 2, onChange: this.changePage}}></Table>
      </div>
    )
  }
}

export default WealthDetail;