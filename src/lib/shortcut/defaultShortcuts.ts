import type { Shortcut } from './Shortcut';

export const defaultShortcuts: Shortcut[] = [
	{ keys: ['Ctrl', '+'], commandType: 'ZoomInCommand' },
	{ keys: ['Ctrl', '='], commandType: 'ZoomInCommand' },
	{ keys: ['Ctrl', '-'], commandType: 'ZoomOutCommand' },
	{ keys: ['Ctrl', '_'], commandType: 'ZoomOutCommand' },
	{ keys: ['Ctrl', '0'], commandType: 'ResetZoomCommand' },
	{ keys: ['Delete'], commandType: 'RemoveNodesActionCommand' },
];
