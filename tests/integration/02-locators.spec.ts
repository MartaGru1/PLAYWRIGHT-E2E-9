import { test, Locator } from "@playwright/test";

// test.use({
//   launchOptions: {
//     slowMo: 3000
//   }
// })

test.describe("Playwright Locators", () => {

  test("Playwright locator() API", async ({ page }) => {
    await page.goto("https://techglobal-training.com/");

    // await page.click('#myLocator')

    // let myLocator: Locator;

    // myLocator = page.locator('#myLocator')

    // await myLocator.click()

    await page.locator('#logo').click()

    await page.click('#logo')

    const myLogo = page.locator('#logo')
  });

  test("Playwright - Custom Pseudo Classes", async ({ page }) => {
    await page.goto("https://techglobal-training.com/frontend");

    const cards = page.locator('.card')

    await cards.locator(':has-text("HTML Elements")').click()

    // await page.locator('a', { hasText: "HTML Elements"}).click()

    await page.locator('button:has-text("Register")').click()
    await page.locator('button:has-text("Sign in"):visible').highlight()

    const countOfDivs = await page.locator('#radio-button-group > div').count()

    console.log(countOfDivs + ' is the amount of div elements in radio group')

    const javaRadioButton = page.locator('#java_radio')

    const javaParentDiv = page.locator('#radio-button-group > div', { has: javaRadioButton })

    console.log(await javaParentDiv.count() + ' is the real amount we need')

    const noJavaParentDiv = page.locator('#radio-button-group > div', { hasNot: javaRadioButton })

    console.log(await noJavaParentDiv.count() + ' is the real amount we need')
  });

  test('Playwright - Chaining the Locators', async({ page }) => {

    await page.goto("https://techglobal-training.com/frontend");
    await page.locator('a:has-text("HTML Elements")').click()

    const unorderedList = page.locator('#unordered_list')

    const childItem = unorderedList.locator('#unordered_list_item1')
  })
});