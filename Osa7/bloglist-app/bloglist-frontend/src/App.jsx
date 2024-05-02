import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
} from '@mui/material'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { Notification } from './components/notifications.jsx'
import LoginForm from './components/loginForm.jsx'
import BlogForm from './components/BlogForm.jsx'
import Togglable from './components/Togglable.jsx'
import { setNewNotification } from './reducers/notificationReducer.js'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  //const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort(
        (blog1, blog2) => blog2.likes - blog1.likes
      )
      setBlogs(sortedBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      console.log('logging in with', username, password)
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNewNotification('wrong username or password', 5, 'error'))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleLike = async (blog) => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      await blogService.update(blog.id, {
        user: blog.user,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      })
      setBlogs(
        blogs
          .map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
          .sort((blog1, blog2) => blog2.likes - blog1.likes)
      )
    } catch (exception) {
      dispatch(setNewNotification('error', 5, 'error'))
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter((a) => a.id !== blog.id))
        dispatch(setNewNotification('Blog removed', 5, 'notification'))
      } catch (exception) {
        dispatch(setNewNotification('Not authorized', 5, 'error'))
      }
    }
  }

  const createBlog = async (blogObject) => {
    try {
      console.log(blogObject)
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      dispatch(
        setNewNotification(
          `a new blog ${blog.title} by ${blog.author} added`,
          5,
          'notification'
        )
      )
    } catch (exception) {
      dispatch(setNewNotification('blog creation failed', 5, 'error'))
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <Container>
      <div>
        <Notification />
        <h2>Blogs</h2>
        <div>
          {user.name} logged in
          <Button onClick={handleLogout}>logout</Button>
        </div>
        <br />
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <Blog
                    key={blog.id}
                    blog={blog}
                    handleLike={handleLike}
                    handleDelete={handleDelete}
                    username={user.username}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  )
}

export default App
