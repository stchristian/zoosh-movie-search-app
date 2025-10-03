import { test, expect } from '@playwright/test';

test.describe('Movie Search Application', () => {
  test('should display the search page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Movie Search' })).toBeVisible();
    await expect(page.getByPlaceholder('Search for movies...')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
  });

  test('should search for movies and display results', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder('Search for movies...').fill('Matrix');
    await page.getByRole('button', { name: 'Search' }).click();

    // Wait for results to appear
    await expect(page.getByText(/Matrix/i).first()).toBeVisible({ timeout: 10000 });
  });

  test('should display movie details when clicking on a movie', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder('Search for movies...').fill('Inception');
    await page.getByRole('button', { name: 'Search' }).click();

    // Wait for movie to appear in results
    const firstMovie = page.getByRole('button').filter({ hasText: 'Inception' }).first();
    await expect(firstMovie).toBeVisible({ timeout: 10000 });
    await firstMovie.click();

    // Wait for Wikipedia summary to load
    await expect(page.getByText('Wikipedia Summary')).toBeVisible({ timeout: 10000 });
  });

  test('should show similar movies when clicking similar button', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder('Search for movies...').fill('Avatar');
    await page.getByRole('button', { name: 'Search' }).click();

    // Wait for similar button to appear
    const similarButton = page.getByRole('button', { name: /similar/i }).first();
    await expect(similarButton).toBeVisible({ timeout: 10000 });
    await similarButton.click();

    // Wait for similar movies view
    await expect(page.getByText(/Showing similar movies/i)).toBeVisible({ timeout: 10000 });
  });

  test('should show recommended movies when clicking recommend button', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder('Search for movies...').fill('Avengers');
    await page.getByRole('button', { name: 'Search' }).click();

    // Wait for recommend button to appear
    const recommendButton = page.getByRole('button', { name: /recommend/i }).first();
    await expect(recommendButton).toBeVisible({ timeout: 10000 });
    await recommendButton.click();

    // Wait for recommended movies view
    await expect(page.getByText(/Showing recommended movies/i)).toBeVisible({ timeout: 10000 });
  });

  test('should navigate back to search results', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder('Search for movies...').fill('Batman');
    await page.getByRole('button', { name: 'Search' }).click();

    // Wait for similar button to appear and click
    const similarButton = page.getByRole('button', { name: /similar/i }).first();
    await expect(similarButton).toBeVisible({ timeout: 10000 });
    await similarButton.click();

    // Wait for similar movies alert and then go back
    await expect(page.getByText(/Showing similar movies/i)).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: /Back to Search/i }).click();

    // Verify we're back to search results
    await expect(page.getByText(/Batman/i).first()).toBeVisible();
  });

  test('should support pagination', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder('Search for movies...').fill('Star');
    await page.getByRole('button', { name: 'Search' }).click();

    // Wait for Page 1 indicator to appear
    await expect(page.getByText('Page 1')).toBeVisible({ timeout: 10000 });

    // Click Next button
    const nextButton = page.getByRole('button', { name: 'Next' });
    await nextButton.click();

    // Wait for page number to change to 2
    await expect(page.getByText('Page 2')).toBeVisible({ timeout: 10000 });
  });
});
