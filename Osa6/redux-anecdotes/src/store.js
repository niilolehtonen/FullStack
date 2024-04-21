import filterReducer from "./reducers/filterReducer"
import notificationReducer from "./reducers/notificationReducer"
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import anecdoteReducer from "./reducers/anecdoteReducer"

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notification: notificationReducer,
})

const store = configureStore({ reducer })

export default store
