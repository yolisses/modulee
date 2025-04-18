import { CopyNodesActionCommand } from '$lib/node/actionCommands/CopyNodesActionCommand';
import { GroupNodesActionCommand } from '$lib/node/actionCommands/GroupNodesActionCommand';
import { RedoActionCommand } from '$lib/node/actionCommands/RedoActionCommand';
import { RemoveNodesActionCommand } from '$lib/node/actionCommands/RemoveNodesActionCommand';
import { SelectedAllNodesActionCommand } from '$lib/node/actionCommands/SelectedAllNodesActionCommand';
import { ToggleIsMuteActionCommand } from '$lib/node/actionCommands/ToggleIsMuteActionCommand';
import { UndoActionCommand } from '$lib/node/actionCommands/UndoActionCommand';
import { ResetZoomCommand } from '../space/zoom/ResetZoomCommand';
import { ZoomInCommand } from '../space/zoom/ZoomInCommand';
import { ZoomOutCommand } from '../space/zoom/ZoomOutCommand';
import type { ActionCommandClass } from './actionCommandClass';

// TODO remove name duplication of this command list and the nodes editor
// command list
export const actionCommandClasses: ActionCommandClass[] = [
	ZoomInCommand,
	ZoomOutCommand,
	ResetZoomCommand,
	UndoActionCommand,
	RedoActionCommand,
	CopyNodesActionCommand,
	GroupNodesActionCommand,
	RemoveNodesActionCommand,
	ToggleIsMuteActionCommand,
	SelectedAllNodesActionCommand,
];
