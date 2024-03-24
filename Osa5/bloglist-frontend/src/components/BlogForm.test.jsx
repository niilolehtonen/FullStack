import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> calls the createBlog function with correct params', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()
  render(<BlogForm createBlog={createBlog} />)
  const titleField = screen.getByPlaceholderText('title')
  const authorField = screen.getByPlaceholderText('author')
  const urlField = screen.getByPlaceholderText('url')
  const createButton = screen.getByText(/create/)
  await user.type(titleField, 'blog')
  await user.type(authorField, 'Gordon Ramsay')
  await user.type(urlField, 'www.chefskiss.com')
  await user.click(createButton)
  expect(createBlog.mock.calls[0][0].title).toBe('blog')
  expect(createBlog.mock.calls[0][0].author).toBe('Gordon Ramsay')
  expect(createBlog.mock.calls[0][0].url).toBe('www.chefskiss.com')
})
