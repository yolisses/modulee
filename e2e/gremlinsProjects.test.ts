import { test } from '@playwright/test';

test('run gremlins in projects page', async ({ page }) => {
	await page.addInitScript({
		path: './node_modules/gremlins.js/dist/gremlins.min.js',
	});
	await page.goto('http://localhost:5173/projects');
	await page.evaluate(() => {
		return gremlins.createHorde().unleash();
	});
});
