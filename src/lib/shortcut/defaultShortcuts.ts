import type { Shortcut } from './Shortcut';

export const defaultShortcuts: Shortcut[] = [
	{ keys: ['+'], commandType: 'ZoomInContextualCommand' },
	{ keys: ['-'], commandType: 'ZoomOutContextualCommand' },
];
