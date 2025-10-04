import { CopyNodesActionCommand } from '$lib/node/actionCommands/CopyNodesActionCommand';
import { GroupNodesActionCommand } from '$lib/node/actionCommands/GroupNodesActionCommand';
import { OrganizeNodesActionCommand } from '$lib/node/actionCommands/OrganizeNodesActionCommand';
import { PasteNodesActionCommand } from '$lib/node/actionCommands/PasteNodesActionCommand';
import { RedoActionCommand } from '$lib/node/actionCommands/RedoActionCommand';
import { RemoveNodesActionCommand } from '$lib/node/actionCommands/RemoveNodesActionCommand';
import { RenameNodesActionCommand } from '$lib/node/actionCommands/RenameNodesActionCommand';
import { SelectedAllNodesActionCommand } from '$lib/node/actionCommands/SelectedAllNodesActionCommand';
import { ToggleIsMuteActionCommand } from '$lib/node/actionCommands/ToggleIsMuteActionCommand';
import { UndoActionCommand } from '$lib/node/actionCommands/UndoActionCommand';
import { ResetZoomCommand } from '$lib/space/zoom/ResetZoomCommand';
import { ZoomInCommand } from '$lib/space/zoom/ZoomInCommand';
import { ZoomOutCommand } from '$lib/space/zoom/ZoomOutCommand';

export const actionCommandClassesByType = {
	CopyNodesActionCommand,
	GroupNodesActionCommand,
	OrganizeNodesActionCommand,
	PasteNodesActionCommand,
	RedoActionCommand,
	RemoveNodesActionCommand,
	RenameNodesActionCommand,
	ResetZoomCommand,
	SelectedAllNodesActionCommand,
	ToggleIsMuteActionCommand,
	UndoActionCommand,
	ZoomInCommand,
	ZoomOutCommand,
} as const;
