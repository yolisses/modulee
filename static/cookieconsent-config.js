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
						'We use cookies to enhance your experience. Please allow analytics cookies to help us improve our app by tracking usage and behavior.',
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
								'We use Google Analytics and Hotjar. Google Analytics collects data on user interactions, like page visits and time spent. And Hotjar tracks user behavior, such as clicks and scrolling, to help us understand site usage and improve the design.',
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
