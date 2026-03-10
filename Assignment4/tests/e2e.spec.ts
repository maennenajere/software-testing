import { test, expect } from '@playwright/test';

test.describe('Dog App E2E Tests', () => {
  test('loads dog image when page is opened', async ({ page }) => {
    const responsePromise = page.waitForResponse(
      response => response.url().includes('/api/dogs/random') && response.status() === 200
    );

    await page.goto('/');

    await responsePromise;

    const image = page.locator('img[alt="Random dog"]');
    await expect(image).toBeVisible();

    const imgSrc = await image.getAttribute('src');
    expect(imgSrc).toBeTruthy();

    expect(imgSrc).toMatch(/^https:\/\//);
  });

  test('loads dog image when button is clicked', async ({ page }) => {
    await page.goto('/');

    await page.waitForResponse(
      response => response.url().includes('/api/dogs/random') && response.status() === 200
    );

    const image = page.locator('img[alt="Random dog"]');
    await expect(image).toBeVisible();

    const responsePromise = page.waitForResponse(
      response => response.url().includes('/api/dogs/random') && response.status() === 200
    );

    await page.click('button:has-text("Get Another Dog")');

    await responsePromise;

    const newImgSrc = await image.getAttribute('src');
    expect(newImgSrc).toBeTruthy();

    expect(newImgSrc).toMatch(/^https:\/\//);
  });

  test('shows error when API call fails', async ({ page }) => {
    await page.route('**/api/dogs/random', route => route.abort());

    await page.goto('/');

    const errorElement = page.locator('text=/error/i').first();
    await expect(errorElement).toBeVisible();
  });
});
