import type { Shortcut } from './Shortcut';

// TODO consider creating a KeySomething type to replace keys, using control,
// shift and alt attributes instead of play strings.
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
];
