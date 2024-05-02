import notificationReducer from './reducers/notificationReducer'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

const reducer = combineReducers({
  notification: notificationReducer,
})

const store = configureStore({ reducer })

export default store
