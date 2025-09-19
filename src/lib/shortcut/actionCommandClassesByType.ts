import { CopyNodesActionCommand } from '$lib/node/actionCommands/CopyNodesActionCommand';
import { FormatNodesActionCommand } from '$lib/node/actionCommands/FormatNodesActionCommand';
import { GroupNodesActionCommand } from '$lib/node/actionCommands/GroupNodesActionCommand';
import { PasteNodesActionCommand } from '$lib/node/actionCommands/PasteNodesActionCommand';
import { RedoActionCommand } from '$lib/node/actionCommands/RedoActionCommand';
import { RemoveNodesActionCommand } from '$lib/node/actionCommands/RemoveNodesActionCommand';
import { SelectedAllNodesActionCommand } from '$lib/node/actionCommands/SelectedAllNodesActionCommand';
import { ToggleIsMuteActionCommand } from '$lib/node/actionCommands/ToggleIsMuteActionCommand';
import { UndoActionCommand } from '$lib/node/actionCommands/UndoActionCommand';
import { ResetZoomCommand } from '$lib/space/zoom/ResetZoomCommand';
import { ZoomInCommand } from '$lib/space/zoom/ZoomInCommand';
import { ZoomOutCommand } from '$lib/space/zoom/ZoomOutCommand';
import type { ActionCommandClass } from './actionCommandClass';

export const actionCommandClassesByType: Record<string, ActionCommandClass> = {
	CopyNodesActionCommand,
	FormatNodesActionCommand,
	GroupNodesActionCommand,
	PasteNodesActionCommand,
	RedoActionCommand,
	RemoveNodesActionCommand,
	ResetZoomCommand,
	SelectedAllNodesActionCommand,
	ToggleIsMuteActionCommand,
	UndoActionCommand,
	ZoomInCommand,
	ZoomOutCommand,
};
