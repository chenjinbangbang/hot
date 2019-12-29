import React from 'react'
import './index.scss'
import { Form, Button, DatePicker, Select, Table } from 'antd'
import Title from '@/components/title/title'

// import moment from 'moment'
const { RangePicker } = DatePicker
const { Option } = Select

class WealthDetail extends React.Component {
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

  // 提交表单 - 点击搜索
  handleSubmit = e => {
    e.preventDefault();
    // console.log(this.props.form)

    console.log(this.props.form.getFieldsValue())
    // console.log(this.props.form.getFieldValue('username'))
    // console.log(this.props.form.getFieldValue('time_range'))
    // let time_range = this.props.form.getFieldValue('time_range')
    // console.log(new Date(time_range[0]).getFullYear())


  }

  // 表格分页
  changePage = (page) => {
    this.setState({ current: page })
  }

  render() {
    const { columns, data, current } = this.state
    const { getFieldDecorator } = this.props.form
    return (
      <div className='wealth-detail'>
        <Title title='财务明细' />

        <Form layout='inline' onSubmit={this.handleSubmit} className='login-form'>
          <Form.Item label='起止时间'>
            {
              getFieldDecorator('time_range', {
                // initialValue: [moment('2015/01/01', 'YYYY/MM/DD'), moment('2015/01/02', 'YYYY/MM/DD')]
              })(
                <RangePicker format='YYYY/MM/DD' placeholder={['开始日期', '结束日期']}></RangePicker>
              )
            }
          </Form.Item>
          <Form.Item label='类型'>
            {
              getFieldDecorator('type', {
                initialValue: '0'
              })(
                <Select style={{ width: 150 }}>
                  <Option value='0'>购买金币</Option>
                  <Option value='1'>金币兑换现金</Option>
                  <Option value='2'>发布任务</Option>
                  <Option value='3'>完成任务</Option>
                </Select>
              )
            }
            {/* <Input value={form.password} defaultValue={form.password} prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}} /> } placeholder='请输入密码' onChange={this.handleChange.bind(this, 'password')} size='' /> */}
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>搜索</Button>
          </Form.Item>
        </Form>

        <div className='wealth-detail-note'>账户余额：<span className='theme'>100</span>元，金币：<span className='theme'>99</span>个，平台只保留2个月的记录</div>

        <Table columns={columns} dataSource={data} pagination={{ current, showQuickJumper: true, onChange: this.changePage }}></Table>
      </div>
    )
  }
}

const WealthDetailForm = Form.create({})(WealthDetail)

export default WealthDetailForm;