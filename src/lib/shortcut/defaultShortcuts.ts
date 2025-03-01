import type { Shortcut } from './Shortcut';

export const defaultShortcuts: Shortcut[] = [
	{ keys: ['Ctrl', '+'], commandType: 'ZoomInCommand' },
	{ keys: ['Ctrl', 'Shift', '+'], commandType: 'ZoomInCommand' },
	{ keys: ['Ctrl', '-'], commandType: 'ZoomOutCommand' },
];
