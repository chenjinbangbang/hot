import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

// createStore：创建一个Redux store来以存放应用中所有的state。应用中应有且仅有一个store
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './redux/reducer'
import { Provider } from 'react-redux'
// import AuthRoute from './components/authroute/authroute'

const store = createStore(reducers, applyMiddleware(thunk))

// function render() {
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
// }
// render()

// 注册监听器
// store.subscribe(render)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
