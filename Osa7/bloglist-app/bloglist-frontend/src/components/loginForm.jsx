import { TextField, Button } from '@mui/material'

const loginForm = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        <TextField
          data-testid="username"
          name="username"
          label="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ m: 1 }}
        />
      </div>
      <div>
        <TextField
          name="password"
          data-testid="password"
          type="password"
          label="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ m: 1 }}
        />
      </div>
      <Button type="submit" color="primary" variant="contained" sx={{ m: 1 }}>
        login
      </Button>
    </form>
  )
}

export default loginForm
