const {test,expect,defineConfig} = require('@playwright/test');

test('Swag Lab test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    // Expect a title to contain Swag Labs
    await expect(page).toHaveTitle('Swag Labs');

    // Login
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    //check the product page load
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.getByText('Products')).toBeVisible();

    // Add item to shopping cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    // View shopping cart
    await page.locator('[data-test="shopping-cart-link"]').click();
   
    // Verify correct item
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');

    // Proceed checkout and fill in required detail
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').click();
    await page.locator('[data-test="firstName"]').fill('standard');
    await page.locator('[data-test="lastName"]').click();
    await page.locator('[data-test="lastName"]').fill('user');
    await page.locator('[data-test="postalCode"]').click();
    await page.locator('[data-test="postalCode"]').fill('11111');

    // Complete purchase
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();

    // Verify success message
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!')
}); 

// generate report in playwright-report folder
export default defineConfig({
 
  reporter: [['html', { outputFolder: 'SwagLabTest-report' }]]
  
});