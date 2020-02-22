// 倒计时组件
import React from 'react'
import './index.scss'

class CountDown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // time: props.time,
      countdownTime: '24小时00分00秒',
      interval: null
    }
  }

  UNSAFE_componentWillMount() {
    // time作为闭包进行倒计时递减计算
    let { time } = this.props
    let interval = setInterval(() => {
      if (time > 0) {
        time--

        // 计算倒计时
        let hour = Math.floor(time / 60 / 60 / 1000)
        let minute = Math.floor(time / 60 / 24 / 1000)
        let second = time % 60
        let countdownTime = `${this.zeroFn(hour)}小时${this.zeroFn(minute)}分${this.zeroFn(second)}秒`

        this.setState({ countdownTime, interval })
      } else {
        clearInterval(interval)
      }
    }, 1000)
  }

  componentWillUnmount() {
    // const { interval } = this.state
    // if (interval) {
    //   console.log(interval)
    //   clearInterval(interval)
    // }
    // 重置state
    this.setState = (state, callback) => {
      return
    }
  }

  // 补零显示
  zeroFn(time) {
    return time >= 10 ? time : '0' + time
  }

  render() {
    const { countdownTime } = this.state
    return (
      <span className='countdown'>{countdownTime}</span>
    )
  }
}

export default CountDown