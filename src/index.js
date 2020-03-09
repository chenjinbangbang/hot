import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker'
import './util/config'

// 全局化配置，设置成中文
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
// 默认语言为 en-US，如果你需要设置其他语言，推荐在入口文件全局设置 locale
// import moment from 'moment'
import 'moment/locale/zh-cn'

// createStore：创建一个Redux store来以存放应用中所有的state。应用中应有且仅有一个store
// compose：这是函数式编程中的方法，为了方便，被放到了Redux里。当需要吧多个store增强器依次执行的时候，需要用到它
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './redux/reducer'
import { Provider } from 'react-redux'

// 默认语言为 en-US，如果你需要设置其他语言，推荐在入口文件全局设置 locale
// moment.locale('zh-cn')

const store = createStore(reducer, compose(applyMiddleware(thunk)))

// function render() {
ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
)
// }
// render()

// 注册监听器
// store.subscribe(render)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
