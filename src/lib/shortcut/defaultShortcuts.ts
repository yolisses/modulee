import type { Shortcut } from './Shortcut';

// TODO consider creating a KeySomething type to replace keys, using control,
// shift and alt attributes instead of plain strings. E.g: {key: 'A', control:
// true, shift:false}
export const defaultShortcuts: Shortcut[] = [
	{ keys: ['Ctrl', '+'], commandType: 'ZoomInCommand' },
	{ keys: ['Ctrl', '='], commandType: 'ZoomInCommand' },
	{ keys: ['Ctrl', '-'], commandType: 'ZoomOutCommand' },
	{ keys: ['Ctrl', '_'], commandType: 'ZoomOutCommand' },
	{ keys: ['Ctrl', '0'], commandType: 'ResetZoomCommand' },
	{ keys: ['Ctrl', 'Z'], commandType: 'UndoActionCommand' },
	{ keys: ['Ctrl', 'Y'], commandType: 'RedoActionCommand' },
	{ keys: ['Delete'], commandType: 'RemoveNodesActionCommand' },
	{ keys: ['Ctrl', 'C'], commandType: 'CopyNodesActionCommand' },
	{ keys: ['Ctrl', 'V'], commandType: 'PasteNodesActionCommand' },
	{ keys: ['Ctrl', 'G'], commandType: 'GroupNodesActionCommand' },
	{ keys: ['Ctrl', 'F'], commandType: 'FormatNodesActionCommand' },
	{ keys: ['Ctrl', 'M'], commandType: 'ToggleIsMuteActionCommand' },
	{ keys: ['Ctrl', 'Shift', 'Z'], commandType: 'RedoActionCommand' },
	{ keys: ['Ctrl', 'A'], commandType: 'SelectedAllNodesActionCommand' },
];
