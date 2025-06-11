import { test } from '@playwright/test';

test('run gremlins.js buttons', async ({ page }) => {
	await page.addInitScript({
		path: './node_modules/gremlins.js/dist/gremlins.min.js',
	});
	await page.goto('http://localhost:5173');
	await page.evaluate(() => {
		const customClicker = gremlins.species.clicker({
			clickTypes: ['click'],
			canClick: (element) => {
				const tag = element.tagName.toLowerCase();
				return (
					tag === 'a' ||
					tag === 'button' ||
					tag === 'input' ||
					tag === 'select' ||
					tag === 'option' ||
					tag === 'textarea' ||
					(element.hasAttribute('role') &&
						(element.getAttribute('role') === 'button' ||
							element.getAttribute('role') === 'option'))
				);
			},
		});
		return gremlins
			.createHorde({
				species: [customClicker],
			})
			.unleash();
	});
});
