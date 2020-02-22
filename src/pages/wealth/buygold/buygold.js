/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
// import ReactDOM from 'react-dom'
import './index.scss'
// import { Link } from 'react-router-dom'
import { Button, message, Icon } from 'antd'
import Title from '@/components/title/title'

class Pay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false, // 点击按钮加载

      gold: 100, // 金币总计
      wealth: 100, // 现金余额

      buygoldData: [10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000], // 购买的金币数量
      buygoldChoose: 0 // 选择的金币数量类型
    }
  }

  UNSAFE_componentWillMount() {

  }

  // 点击购买
  submit = () => {
    const { wealth, buygoldData, buygoldChoose } = this.state
    if (buygoldData[buygoldChoose] > wealth) {
      message.error('现金余额不足，请充值')
      return
    }
    message.success('购买金币成功')

  }

  render() {
    const { loading, gold, wealth, buygoldData, buygoldChoose } = this.state

    return (
      <div className='buygold'>
        <Title title='购买金币' />

        <div className='buygold-note'>
          <p className='buygold-note-title'>金币总计：<span className='danger'>{gold.toFixed(2)}</span>个</p>
          {/* <p>购买金币可选择10金币，20金币，50金币，100金币，200金币，500金币，1000金币，2000金币，5000金币，1:1兑换</p> */}
          <p>只能使用平台的现金余额进行购买，剩余现金余额：<span className='danger'>{wealth.toFixed(2)}</span>元</p>
          <p>如需充值，请前往充值，有问题可联系财务客服QQ：
            <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1653103050&site=qq&menu=yes">
              <img border="0" src="http://wpa.qq.com/pa?p=2:1653103050:41" alt="财务-客服" title="财务-客服" />
            </a></p>
        </div >

        <div className='buygold-content'>
          <ul>
            {
              buygoldData.map((item, index) => (
                <li className={buygoldChoose === index ? 'active' : null} key={index} onClick={() => { this.setState({ buygoldChoose: index }) }}>
                  {
                    buygoldChoose === index &&
                    <React.Fragment>
                      <div className='check-bg'></div>
                      <Icon className='check' type='check'></Icon>
                    </React.Fragment>
                  }
                  {item}金币
                </li>
              ))
            }
          </ul>

          <div className='buygold-wealth'>需要<span className='danger'>{buygoldData[buygoldChoose].toFixed(2)}</span>元，将从现金余额扣除</div>

          <Button className='success-btn' type='primary' onClick={this.submit} loading={loading}>点击购买</Button>

        </div >

      </div >
    )
  }
}


export default Pay