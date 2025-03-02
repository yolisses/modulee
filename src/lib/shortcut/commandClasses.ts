import { ResetZoomCommand } from '../space/zoom/ResetZoomCommand';
import { ZoomInCommand } from '../space/zoom/ZoomInCommand';
import { ZoomOutCommand } from '../space/zoom/ZoomOutCommand';
import type { CommandClass } from './commandClass';

// TODO remove name duplication of this command list and the nodes editor
// command list
export const commandClasses: CommandClass[] = [ZoomInCommand, ZoomOutCommand, ResetZoomCommand];
