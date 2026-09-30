import { expect, test } from '@playwright/test'

test.describe('homepage', () => {
  test('renders hero and primary navigation', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(
      page.getByRole('link', { name: 'View projects' }),
    ).toBeVisible()

    const nav = page.getByRole('navigation', { name: 'Primary' })
    await expect(nav.getByRole('link', { name: 'Projects' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'About' })).toBeVisible()
  })

  test('navigates to the projects page', async ({ page }) => {
    await page.goto('/')
    await page
      .getByRole('navigation', { name: 'Primary' })
      .getByRole('link', { name: 'Projects' })
      .click()

    await expect(page).toHaveURL(/\/projects$/)
    await expect(
      page.getByRole('heading', { level: 2, name: 'Projects' }),
    ).toBeVisible()
  })

  test('toggles the colour theme', async ({ page }) => {
    await page.goto('/')
    const html = page.locator('html')
    await expect(html).toHaveClass(/dark/)

    await page.getByRole('button', { name: 'Toggle colour theme' }).click()
    await expect(html).toHaveClass(/light/)
  })
})
