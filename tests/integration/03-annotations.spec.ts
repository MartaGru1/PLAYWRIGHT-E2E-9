import test from "@playwright/test";
import { clickLink } from "../../helpers/clickHelpers";

test.describe('Annotations', () => {
  test.beforeEach(async({ page }) => {
    await page.goto('https://techglobal-training.com/frontend')

    await clickLink(page, 'HTML Elements')
  })

  test('Annotations - fail', async({ page }) => {
    
  })
})
