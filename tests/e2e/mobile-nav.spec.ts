import { expect, test } from '@playwright/test'

test.use({ viewport: { width: 375, height: 812 } })

test.describe('mobile navigation', () => {
  test('opens, navigates and closes the menu', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeHidden()

    const toggle = page.getByRole('button', { name: 'Open menu' })
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await toggle.click()

    const menu = page.getByRole('navigation', { name: 'Mobile' })
    await expect(menu).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'Close menu' }),
    ).toHaveAttribute('aria-expanded', 'true')

    await page.keyboard.press('Escape')
    await expect(menu).toBeHidden()
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused()

    await page.getByRole('button', { name: 'Open menu' }).click()
    await menu.getByRole('link', { name: 'Projects' }).click()
    await expect(page).toHaveURL(/\/projects$/)
    await expect(menu).toBeHidden()
  })
})
