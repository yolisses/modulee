import type { CommandClass } from './commandClass';
import { ResetZoomCommand } from './ResetZoomCommand';
import { ZoomInCommand } from './ZoomInCommand';
import { ZoomOutCommand } from './ZoomOutCommand';

// TODO remove name duplication of this command list and the nodes editor
// command list
export const commandClasses: CommandClass[] = [ZoomInCommand, ZoomOutCommand, ResetZoomCommand];
