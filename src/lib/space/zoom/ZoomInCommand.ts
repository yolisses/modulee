import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { ZoomContext } from './zoomContext';

export class ZoomInCommand extends ActionCommand {
	execute(contexts: { zoomContext: ZoomContext }): void {
		contexts.zoomContext.zoom += 1;
	}
}
