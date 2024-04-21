import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state) {
      return null
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const setNewNotification = (content, duration) => {
  return async (dispatch) => {
    dispatch(setNotification(content))
    await new Promise((resolve) => setTimeout(resolve, duration * 1000))
    dispatch(clearNotification())
  }
}

export default notificationSlice.reducer
