// 倒计时组件
import React from 'react'
import './index.scss'

class CountDown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // time: props.time,
      countdownTime: ''
    }
  }

  UNSAFE_componentWillMount() {
    // time作为闭包进行倒计时递减计算
    let { time, type } = this.props
    let interval = setInterval(() => {
      if (time > 0) {
        time--

        let countdownTime = ''
        if (type === 0) {
          // 计算倒计时
          let hour = Math.floor(time / 60 / 60)
          let minute = Math.floor((time - hour * 60 * 60) / 60)
          let second = time % 60
          countdownTime = `${this.zeroFn(hour)}小时${this.zeroFn(minute)}分${this.zeroFn(second)}秒`
        } else {
          countdownTime = this.zeroFn(time)
          this.props.onChange(time)
        }

        this.setState({ countdownTime })
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

CountDown.defaultProps = {
  time: 0, // 时间倒计时
  type: 0, // 0：返回00小时00分钟00秒，1：返回数字
  onChange() { } // 值改变触发事件
}

export default CountDown