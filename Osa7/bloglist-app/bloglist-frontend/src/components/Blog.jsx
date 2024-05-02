import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, TableCell } from '@mui/material'

const Blog = ({ blog, handleLike, handleDelete, username }) => {
  const [showBlogInfo, setShowBlogInfo] = useState(false)

  const changeVisibility = () => {
    setShowBlogInfo(!showBlogInfo)
  }

  const isCreator = blog.user.username === username

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  if (!showBlogInfo) {
    return (
      <div style={blogStyle}>
        <TableCell>{blog.title}</TableCell>
        <TableCell>{blog.author}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="grey"
            onClick={changeVisibility}
            sx={{ ml: 1, m: 1 }}
          >
            view
          </Button>
        </TableCell>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <TableCell>{blog.title}</TableCell>
        <TableCell>{blog.author}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="grey"
            onClick={changeVisibility}
            sx={{ ml: 1, m: 1 }}
          >
            hide
          </Button>
        </TableCell>
        <br />
        <TableCell>{blog.url}</TableCell>
        <br />
        <TableCell>{blog.likes}</TableCell>
        <TableCell>
          <Button onClick={() => handleLike(blog)}>like</Button>
        </TableCell>
        <br />
        <TableCell>{blog.user.name}</TableCell>
        <br />
        {isCreator && (
          <TableCell>
            <Button onClick={() => handleDelete(blog)}>remove</Button>
          </TableCell>
        )}
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
}

export default Blog
