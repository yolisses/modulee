import { Command } from '$lib/shortcut/Command';
import type { ZoomContext } from './zoomContext';

export class ZoomInCommand extends Command {
	execute(contexts: { zoomContext: ZoomContext }): void {
		contexts.zoomContext.zoom += 1;
	}
}
