import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  const mockHandler = vi.fn()
  beforeEach(() => {
    const blog = {
      title: 'blog',
      author: 'gordon ramsay',
      url: 'www.chefskiss.com',
      likes: 0,
      user: {
        username: 'gordon',
        name: 'gordonramsay',
      },
    }
    const username = 'gordonramsay'
    const container = render(
      <Blog
        blog={blog}
        handleLike={mockHandler}
        handleDelete={mockHandler}
        username={username}
      />
    )
  })
  test('renders title', () => {
    screen.getByText('blog gordon ramsay')
  })
  test('all info is returned when "view" is toggled', async () => {
    const user = userEvent.setup()
    const button = screen.getByText(/view/)
    await user.click(button)
    screen.getByText(/www.chefskiss.com/)
    screen.getByText(/0/)
    screen.getByText(/gordonramsay/)
  })
  test('like event handler is called twice liked twice', async () => {
    const user = userEvent.setup()
    const view = screen.getByText(/view/)
    await user.click(view)
    const like = screen.getByText(/like/)
    await user.click(like)
    await user.click(like)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
