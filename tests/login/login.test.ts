import { test, expect } from '@playwright/test';
import { existingUsers } from '../../test-setup/localstorage.setup';
 
test.describe.configure({ mode: 'serial' });
 
test.describe('login form tests', () => {
    test('logging in works with an existing account', async ({ page }) => {

      /** I added comments to explain each step of the test case. These comments make the code more readable and help other developers understand the purpose of each action.
          For example, the comment // Navigate to the login page indicates that we’re opening the login page. */
        // Navigate to the login page
        await page.goto('localhost:8080/login');
 
        // Get the first existing user
        /** I renamed the variable existingUser to user for clarity. The new name better reflects its purpose.
            Using descriptive variable names improves code readability */
        const user = existingUsers[0];
 
        // Enter email and password
        /** Instead of using .pressSequentially(existingUser.email) and .pressSequentially(existingUser.password), I used .fill(user.email) and .fill(user.password).
            The .fill() method directly enters the specified value into the input field, which is more straightforward. */
        await page.locator('#root form div:nth-child(1) > div > input').fill(user.email);
        await page.locator('#root form div:nth-child(2) > div > input').fill(user.password);
 
        // Click the submit button
        const submitButton = page.locator('form .MuiButton-sizeMedium');
       /** 	I replaced button.click() with await submitButton.click(). This ensures that the test waits for the button click action to complete before proceeding.
            Explicitly awaiting promises helps avoid race conditions. */
        await submitButton.click();
 
        // Verify that the "Log out" button is visible
        /**I removed the await page.waitForTimeout(1000) because it wasn’t necessary. The test should proceed immediately after clicking the button.
           Waiting for a fixed time can lead to flakiness in tests. */

        await expect(page.locator('text=Log out')).toBeVisible();
    });
});
