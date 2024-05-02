import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { notification: null, error: null },
  reducers: {
    setNotification(state, action) {
      state.notification = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    },
    clearNotification(state) {
      state.notification = null
      state.error = null
    },
  },
})

export const { setNotification, setError, clearNotification } =
  notificationSlice.actions

export const setNewNotification = (content, duration, type) => {
  return async (dispatch) => {
    if (type === 'error') {
      dispatch(setError(content))
    } else if (type === 'notification') {
      dispatch(setNotification(content))
    }
    await new Promise((resolve) => setTimeout(resolve, duration * 1000))
    dispatch(clearNotification())
  }
}

export default notificationSlice.reducer
