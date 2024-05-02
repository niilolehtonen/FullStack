import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const { notification, error } = useSelector((state) => state.notification)
  if (notification) {
    return <Alert severity="success">{notification}</Alert>
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }
}

export { Notification }
