import { expect, test } from '@playwright/test'

test.describe('projects', () => {
  test('lists projects and opens a case study', async ({ page }) => {
    await page.goto('/projects')

    const cards = page.getByRole('article')
    test.skip((await cards.count()) === 0, 'No projects published in the CMS')

    const firstTitle = (
      await cards.first().getByRole('heading').innerText()
    ).trim()
    await cards.first().getByRole('link', { name: firstTitle }).click()

    await expect(page).toHaveURL(/\/projects\/[^/]+$/)
    await expect(
      page.getByRole('heading', { level: 1, name: firstTitle }),
    ).toBeVisible()
    await expect(page).toHaveTitle(
      new RegExp(`^${escapeRegExp(firstTitle)} \\|`),
    )

    await page.getByRole('link', { name: 'All projects' }).click()
    await expect(page).toHaveURL(/\/projects$/)
  })

  test('shows the 404 page for an unknown project', async ({ page }) => {
    const response = await page.goto('/projects/this-project-does-not-exist')

    expect(response?.status()).toBe(404)
    await expect(
      page.getByRole('heading', { name: 'Page not found' }),
    ).toBeVisible()
  })
})

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
