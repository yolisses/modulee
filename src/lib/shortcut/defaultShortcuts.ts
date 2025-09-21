import type { Shortcut } from './Shortcut';

// TODO consider creating a KeySomething type to replace keys, using control,
// shift and alt attributes instead of plain strings. E.g: {key: 'A', control:
// true, shift:false}
export const defaultShortcuts: Shortcut[] = [
	{ keys: ['Ctrl', '_'], commandType: 'ZoomOutCommand' },
	{ keys: ['Ctrl', '-'], commandType: 'ZoomOutCommand' },
	{ keys: ['Ctrl', '+'], commandType: 'ZoomInCommand' },
	{ keys: ['Ctrl', '='], commandType: 'ZoomInCommand' },
	{ keys: ['Ctrl', '0'], commandType: 'ResetZoomCommand' },
	{ keys: ['Ctrl', 'A'], commandType: 'SelectedAllNodesActionCommand' },
	{ keys: ['Ctrl', 'C'], commandType: 'CopyNodesActionCommand' },
	{ keys: ['Ctrl', 'G'], commandType: 'GroupNodesActionCommand' },
	{ keys: ['Ctrl', 'M'], commandType: 'ToggleIsMuteActionCommand' },
	{ keys: ['Ctrl', 'O'], commandType: 'OrganizeNodesActionCommand' },
	{ keys: ['Ctrl', 'Shift', 'Z'], commandType: 'RedoActionCommand' },
	{ keys: ['Ctrl', 'V'], commandType: 'PasteNodesActionCommand' },
	{ keys: ['Ctrl', 'Y'], commandType: 'RedoActionCommand' },
	{ keys: ['Ctrl', 'Z'], commandType: 'UndoActionCommand' },
	{ keys: ['Delete'], commandType: 'RemoveNodesActionCommand' },
];
