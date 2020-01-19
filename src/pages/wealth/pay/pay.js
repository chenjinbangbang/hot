/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
// import ReactDOM from 'react-dom'
import './index.scss'
// import { Link } from 'react-router-dom'
import { Button, Table } from 'antd'
import Title from '@/components/title/title'

import payImg from '@/assets/imgs/pay.jpg'

class Pay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false, // 点击按钮加载
      pay_type: 1, // 充值类型，0：支付宝充值，1：银行卡充值

      wealth: 100, // 现金余额

      current: 1, // 当前页
      // 充值记录头部信息
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          key: 'index',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '充值方式',
          dataIndex: 'pay_type',
          key: 'pay_type',
          align: 'center',
          render: text => <span>{text === 0 ? '支付宝充值' : '银行卡充值'}</span>
        },
        {
          title: '交易方',
          dataIndex: 'account',
          key: 'account',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '交易号',
          dataIndex: 'deal_num',
          key: 'deal_num',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '提交时间',
          dataIndex: 'time',
          key: 'time',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          align: 'center',
          render: text => <span className={text === 1 ? 'success' : 'error'}>{text === 0 ? '已充值，未到账' : '充值成功'}</span>
        },
        {
          title: '充值金额',
          dataIndex: 'wealth',
          key: 'wealth',
          align: 'center',
          render: text => <span>{text.toFixed(2)}</span>
        }
      ],
      // 充值记录数据
      data: []
    }
  }

  UNSAFE_componentWillMount() {
    // 获取充值记录数据
    let data = []
    for (let i = 1; i <= 3; i++) {
      data.push({
        key: i,
        index: i,
        pay_type: 0,
        account: '陈进帮',
        deal_num: '152456456746454878',
        time: '2019-10-10 10:20:20',
        status: 0,
        wealth: 200
      })
    }
    this.setState({ data })
  }

  // 表格分页
  changePage = (page) => {
    this.setState({ current: page })
  }


  render() {
    const { loading, pay_type, wealth, columns, data, current } = this.state

    return (
      <div className='pay'>
        <Title title='充值' />

        <div className='pay-note'>
          <p className='pay-note-title'>现金余额：<span className='error'>{wealth.toFixed(2)}</span>元</p>
          <p>充值成功后，5分钟内到账，若5分钟未到账，可联系财务客服QQ：
            <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1653103050&site=qq&menu=yes">
              <img border="0" src="http://wpa.qq.com/pa?p=2:1653103050:41" alt="财务-客服" title="财务-客服" />
            </a>
          </p>
        </div>

        <div className='pay-content'>
          <div className='pay-content-tab'>
            <Button type={pay_type === 0 ? 'primary' : 'dashed'} onClick={() => { this.setState({ pay_type: 0 }) }}>支付宝充值</Button>
            <Button type={pay_type === 1 ? 'primary' : 'dashed'} onClick={() => { this.setState({ pay_type: 1 }) }}>银行卡充值</Button>
          </div>

          {
            // 支付宝充值
            pay_type === 0 &&
            <div className='pay-content-home'>
              <img src={payImg} alt='' />
              <div className='pay-detail'>
                <p>1. 扫描图中支付宝二维码</p>
                <p>2. 输入充值金额</p>
                <p>3. 记得备注用户名：我的唯一</p>
              </div>
            </div>
          }

          {
            // 银行卡充值
            pay_type === 1 &&
            <div className='pay-content-home'>
              <div className='pay-detail1'>
                <p>银行卡姓名：陈进帮</p>
                <p>开户行：兴业银行</p>
                <p>银行卡号：622908333019429058</p>
                <Button className='success-btn' type='primary' loading={loading}>充值成功</Button>
              </div>
            </div>
          }
        </div>

        <div className='pay-table-title'>充值记录</div>
        <Table columns={columns} dataSource={data} pagination={{ current, showQuickJumper: true, onChange: this.changePage }}></Table>

      </div>
    )
  }
}


export default Pay