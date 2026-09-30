import { expect, test } from '@playwright/test'

const widths = [375, 768, 1440, 1920]
const paths = ['/', '/projects', '/about']

for (const width of widths) {
  test.describe(`viewport ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } })

    for (const path of paths) {
      test(`${path} has no horizontal overflow`, async ({ page }) => {
        await page.goto(path)
        await page.waitForLoadState('networkidle')

        const overflow = await page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
        )
        expect(overflow).toBeLessThanOrEqual(0)
      })
    }
  })
}
