const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, initialBlogs } = require('./helper')
const axios = require('axios')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Gordon Ramsay',
        username: 'gramsay',
        password: 'salis',
      },
    })
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Moi',
        username: 'moi',
        password: 'moi',
      },
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      loginWith(page, 'gramsay', 'salis')
      await expect(page.getByText('Gordon Ramsay logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      loginWith(page, 'gramsay', 'wrong')
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      loginWith(page, 'gramsay', 'salis')
    })

    test('a new blog can be created', async ({ page }) => {
      createBlog(page, 'test', 'gordon ramsay', 'www.test.com')
      await expect(
        page.getByText('A new blog test by gordon ramsay added')
      ).toBeVisible()
      await expect(page.getByText('test gordon ramsay')).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'moi', 'hei', 'www.moro.com')
      })

      test('a blog can be liked', async ({ page }) => {
        await page.pause()
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('1')).toBeVisible()
      })

      test('a blog can be removed', async ({ page }) => {
        page.once('dialog', (dialog) => dialog.accept())
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'remove' }).click()
        await expect(page.getByText('Blog removed')).toBeVisible()
      })

      test('only creator can see the remove button', async ({ page }) => {
        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'moi', 'moi')
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'remove' })).toBeHidden()
      })
    })

    describe('When there are multiple blogs', () => {
      beforeEach(async ({ page, request }) => {
        await page.waitForTimeout(1000)
        const localStorage = await page.evaluate(() =>
          JSON.parse(localStorage.getItem('loggedBlogappUser'))
        )
        const token = localStorage.token
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        }

        for (let i = 0; i < initialBlogs.length; i++) {
          await axios.post(
            'http://localhost:3003/api/blogs',
            initialBlogs[i],
            config
          )
        }
        await page.reload()
      })
      test('blogs are sorted correctly', async ({ page }) => {
        const blogs = await page.locator('.blog').all()
        const likes = []

        for (let i of blogs) {
          await i.getByRole('button', { name: 'view' }).click()
          const likeElement = await i.locator('.likes')
          const text = await likeElement.textContent()
          const likesNum = parseInt(text.replace('likes ', ''))
          likes.push(likesNum)
        }
        let isSorted = true
        for (let i = 0; i < likes.length - 1; i++) {
          if (likes[i] < likes[i + 1]) {
            isSorted = false
            break
          }
        }
        expect(isSorted).toBe(true)
        await expect(page.getByText('React patterns')).toBeVisible()
      })
    })
  })
})
