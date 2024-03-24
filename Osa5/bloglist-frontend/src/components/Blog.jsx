import { useState } from 'react'
import PropTypes from 'prop-types'

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
        {blog.title} {blog.author}
        <button onClick={changeVisibility}>view</button>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={changeVisibility}>hide</button>
        <br />
        {blog.url}
        <br />
        {blog.likes}
        <button onClick={() => handleLike(blog)}>like</button>
        <br />
        {blog.user.name}
        <br />
        {isCreator && (
          <button onClick={() => handleDelete(blog)}>remove</button>
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
