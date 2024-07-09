import { test, expect } from '@playwright/test';

test.describe('Signup and Login Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the signup page
        await page.goto('http://localhost:8080/signup');
    });

    test('Signup happy flow', async ({ page }) => {
        // Fill in the signup form
        await page.fill('#email', 'newuser@example.com');
        await page.fill('#password', 'password123');
        await page.fill('#confirmPassword', 'password123');

        // Click the signup button
        await page.click('form button[type="submit"]');

        // Verify successful signup
        await expect(page.locator('text=Account created successfully')).toBeVisible();
    });

    test('Sign in with newly created account', async ({ page }) => {
        // Navigate to the login page
        await page.goto('http://localhost:8080/login');

        // Fill in the login form
        await page.fill('#email', 'newuser@example.com');
        await page.fill('#password', 'password123');

        // Click the login button
        await page.click('form button[type="submit"]');

        // Verify successful login
        await expect(page.locator('text=Log out')).toBeVisible();
    });
});
