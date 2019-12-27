// combineReducers：辅助函数的作用是，把一个由多个不同的reducer函数作为value的object，合并成一个最终的reducer函数，然后就可以对这个reducer调用createStore
import { combineReducers } from 'redux'
import { user } from './user.redux'

export default combineReducers({ user })