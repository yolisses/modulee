import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.umd.js';

// Enable dark mode
document.documentElement.classList.add('cc--darkmode');

CookieConsent.run({
	guiOptions: {
		consentModal: {
			layout: 'box',
			position: 'bottom right',
			equalWeightButtons: true,
			flipButtons: false,
		},
		preferencesModal: {
			layout: 'box',
			position: 'right',
			equalWeightButtons: true,
			flipButtons: false,
		},
	},
	categories: {
		necessary: {
			readOnly: true,
		},
		analytics: {},
	},
	language: {
		default: 'en',
		autoDetect: 'browser',
		translations: {
			en: {
				consentModal: {
					title: 'Cookie Consent',
					description:
						'Would you please allow us to use analytics tools? It helps a lot to make the app great.',
					acceptAllBtn: 'Accept all',
					acceptNecessaryBtn: 'Reject all',
					showPreferencesBtn: 'Manage preferences',
					footer:
						'<a href="privacy-policy">Privacy Policy</a>\n<a href="/terms-of-use">Terms of Use</a>',
				},
				preferencesModal: {
					title: 'Consent Preferences',
					acceptAllBtn: 'Accept all',
					acceptNecessaryBtn: 'Reject all',
					savePreferencesBtn: 'Save preferences',
					closeIconLabel: 'Close modal',
					serviceCounterLabel: 'Service|Services',
					sections: [
						{
							description:
								'Cookies are small data files stored on your device to help our website function, improve user experience, and analyze usage. You can choose which cookies to allow below.',
						},
						{
							title: 'Strictly Necessary Cookies <span class="pm__badge">Always Enabled</span>',
							description:
								'These cookies are essential for the website to function properly, enabling core features like page navigation and secure access. They cannot be disabled.',
							linkedCategory: 'necessary',
						},
						{
							title: 'Analytics Cookies',
							description:
								'Google Analytics collects basic user iteration such as page visits, clicks, scrolls and time spent.<br> Hotjar records basically all user iteration, such as mouse position at any time, allowing us to deduce how users interpret the app so we can improve design.',
							linkedCategory: 'analytics',
						},
						{
							title: 'More Information',
							description: 'For questions, contact us at moduleeapp@gmail.com.',
						},
					],
				},
			},
		},
	},
});
