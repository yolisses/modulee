import type { Shortcut } from './Shortcut';

export const defaultShortcuts: Shortcut[] = [
	{ keys: ['Ctrl', '+'], commandType: 'ZoomInCommand' },
	{ keys: ['Ctrl', '='], commandType: 'ZoomInCommand' },
	{ keys: ['Ctrl', '-'], commandType: 'ZoomOutCommand' },
	{ keys: ['Ctrl', '_'], commandType: 'ZoomOutCommand' },
	{ keys: ['Ctrl', '0'], commandType: 'ResetZoomCommand' },
	{ keys: ['Ctrl', 'Z'], commandType: 'UndoActionCommand' },
	{ keys: ['Ctrl', 'Y'], commandType: 'RedoActionCommand' },
	{ keys: ['Delete'], commandType: 'RemoveNodesActionCommand' },
	{ keys: ['Ctrl', 'G'], commandType: 'GroupNodesActionCommand' },
	{ keys: ['Ctrl', 'M'], commandType: 'ToggleIsMuteActionCommand' },
	{ keys: ['Ctrl', 'Shift', 'Z'], commandType: 'RedoActionCommand' },
	{ keys: ['Ctrl', 'A'], commandType: 'SelectedAllNodesActionCommand' },
	{ keys: ['Ctrl', 'L'], commandType: 'ToggleIsLateralBarVisibleActionCommand' },
];
