import { test } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';
import { Browser, BrowserContext, chromium, ElementHandle, Page } from 'playwright';

// Configuration
const APP_URL = 'http://localhost:5173'; // Update with your SvelteKit app URL
const TEST_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const OUTPUT_DIR = './stress-test-results';
const LOG_FILE = path.join(OUTPUT_DIR, 'stress-test-log.json');

// Types for log events
interface LogEvent {
	type: string;
	timestamp: string;
	[key: string]: any;
}

// Random delay to mimic human-like interaction
const randomDelay = (): number => Math.random() * 100 + 50;

// Generate a timestamp for logs
const timestamp = (): string => new Date().toISOString();

// Log errors and events to a file
async function logEvent(event: LogEvent): Promise<void> {
	try {
		await fs.appendFile(LOG_FILE, JSON.stringify(event) + '\n');
	} catch (err) {
		console.error('Failed to write to log file:', err);
	}
}

// Stress test as a Playwright test
test('Stress test SvelteKit app', async () => {
	let browser: Browser | null = null;
	let context: BrowserContext | null = null;
	let page: Page | null = null;

	try {
		// Ensure output directory exists
		await fs.mkdir(OUTPUT_DIR, { recursive: true });

		// Initialize browser
		browser = await chromium.launch({ headless: false }); // Set headless: true for CI
		context = await browser.newContext();
		page = await context.newPage();

		// Initialize error tracking
		const errors: LogEvent[] = [];
		let interactionCount: number = 0;

		// Capture console errors
		page.on('console', async (msg) => {
			if (msg.type() === 'error') {
				const errorEvent: LogEvent = {
					type: 'console_error',
					timestamp: timestamp(),
					message: msg.text(),
					location: msg.location(),
				};
				errors.push(errorEvent);
				await logEvent(errorEvent);
				console.log('Console error:', errorEvent);
			}
		});

		// Capture page crashes
		page.on('crash', () => {
			const crashEvent: LogEvent = {
				type: 'page_crash',
				timestamp: timestamp(),
				url: page?.url() || 'unknown',
			};
			errors.push(crashEvent);
			logEvent(crashEvent);
			console.log('Page crashed:', crashEvent);
		});

		// Capture network errors
		page.on('requestfailed', (request) => {
			const failure = request.failure();
			if (failure) {
				const networkError: LogEvent = {
					type: 'network_error',
					timestamp: timestamp(),
					url: request.url(),
					error: failure.errorText,
				};
				errors.push(networkError);
				logEvent(networkError);
				console.log('Network error:', networkError);
			}
		});

		// Navigate to the SvelteKit app with retry
		let navigationSuccess = false;
		for (let attempt = 1; attempt <= 3; attempt++) {
			try {
				await page.goto(APP_URL, { waitUntil: 'networkidle', timeout: 30000 });
				console.log(`Navigated to ${APP_URL}`);
				navigationSuccess = true;
				break;
			} catch (err: unknown) {
				const error = err as Error;
				console.error(`Navigation attempt ${attempt} failed:`, error);
				await logEvent({
					type: 'navigation_error',
					timestamp: timestamp(),
					message: error.message,
					attempt,
				});
				if (attempt === 3) {
					throw new Error(`Failed to navigate to ${APP_URL} after 3 attempts`);
				}
				await page.waitForTimeout(1000); // Wait before retry
			}
		}

		if (!navigationSuccess) {
			throw new Error('Navigation failed');
		}

		// Main stress testing loop
		const startTime: number = Date.now();
		while (Date.now() - startTime < TEST_DURATION && !page.isClosed()) {
			try {
				// Get all clickable elements
				const clickableElements: ElementHandle[] = await page.$$(
					'a, button, [role="button"], input[type="submit"], input[type="button"]',
				);
				// Get all input fields
				const inputElements: ElementHandle[] = await page.$$(
					'input:not([type="submit"]):not([type="button"]), textarea, select',
				);
				// Combine all interactive elements
				const allElements: ElementHandle[] = [...clickableElements, ...inputElements];

				if (allElements.length === 0) {
					console.log('No interactive elements found, refreshing page...');
					await page.reload({ waitUntil: 'networkidle' });
					continue;
				}

				// Pick a random element
				const randomElement: ElementHandle =
					allElements[Math.floor(Math.random() * allElements.length)];
				interactionCount++;

				// Determine element type and perform action
				const tagName: string = await randomElement.evaluate((el: HTMLElement) =>
					el.tagName.toLowerCase(),
				);
				const isInput: boolean = ['input', 'textarea', 'select'].includes(tagName);

				if (isInput) {
					if (tagName === 'select') {
						const options: ElementHandle[] = await randomElement.$$('option');
						if (options.length > 0) {
							const randomOption = options[Math.floor(Math.random() * options.length)];
							const value: string = await randomOption.evaluate(
								(opt: HTMLOptionElement) => opt.value,
							);
							await randomElement.selectOption(value);
							console.log(`Selected option ${value} in ${tagName}`);
							await logEvent({
								type: 'select',
								timestamp: timestamp(),
								element: tagName,
								value,
							});
						}
					} else {
						const inputValue: string = `input-${timestamp()}`;
						await randomElement.fill(inputValue);
						console.log(`Filled ${tagName} with ${inputValue}`);
						await logEvent({
							type: 'input',
							timestamp: timestamp(),
							element: tagName,
							value: inputValue,
						});
					}
				} else {
					const isVisible = await randomElement.isVisible();
					if (isVisible) {
						try {
							await randomElement.click({ timeout: 5000 });
							console.log(`Clicked ${tagName}`);
							await logEvent({
								type: 'click',
								timestamp: timestamp(),
								element: tagName,
							});
						} catch (clickErr: unknown) {
							const error = clickErr as Error;
							console.log(`Click failed on ${tagName}: ${error.message}`);
							await logEvent({
								type: 'click_error',
								timestamp: timestamp(),
								element: tagName,
								message: error.message,
							});
						}
					}
				}

				// Random delay
				await page.waitForTimeout(randomDelay());

				// Occasionally navigate back or reload
				if (Math.random() < 0.1) {
					const historyLength: number = await page.evaluate(() => window.history.length);
					if (historyLength > 1) {
						await page.goBack({ waitUntil: 'networkidle' });
						console.log('Navigated back');
						await logEvent({
							type: 'navigation',
							timestamp: timestamp(),
							action: 'goBack',
						});
					} else {
						await page.reload({ waitUntil: 'networkidle' });
						console.log('Reloaded page');
						await logEvent({
							type: 'navigation',
							timestamp: timestamp(),
							action: 'reload',
						});
					}
				}
			} catch (err: unknown) {
				const error = err as Error;
				console.error('Error during interaction:', error);
				await logEvent({
					type: 'interaction_error',
					timestamp: timestamp(),
					message: error.message,
				});
				// Check if page is still open
				if (page.isClosed()) {
					console.error('Page closed unexpectedly');
					break;
				}
			}
		}

		// Generate summary
		const summary: LogEvent = {
			type: 'summary',
			timestamp: timestamp(),
			data: {
				totalInteractions: interactionCount,
				totalErrors: errors.length,
				errors: {
					pageCrashes: errors.filter((e) => e.type === 'page_crash').length,
					clickErrors: errors.filter((e) => e.type === 'click_error').length,
					consoleErrors: errors.filter((e) => e.type === 'console_error').length,
					networkErrors: errors.filter((e) => e.type === 'network_error').length,
					navigationErrors: errors.filter((e) => e.type === 'navigation_error').length,
					interactionErrors: errors.filter((e) => e.type === 'interaction_error').length,
				},
				duration: (Date.now() - startTime) / 1000 / 60, // in minutes
			},
		};

		console.log('Stress Test Summary:', summary);
		await logEvent(summary);
	} catch (err: unknown) {
		const error = err as Error;
		console.error('Stress test failed:', error);
		await logEvent({
			type: timestamp(),
			error: error.message,
			timestamp: timestamp(),
		});
		throw error; // Fail test on error
	} finally {
		// Ensure cleanup
		if (page && !page.isClosed()) await page.close();
		if (context) await context.close();
		if (browser) await browser.close();
	}
});
