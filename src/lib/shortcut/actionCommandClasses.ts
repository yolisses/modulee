import { RemoveNodesActionCommand } from '$lib/node/v2/RemoveNodesActionCommand';
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
	RemoveNodesActionCommand,
];
