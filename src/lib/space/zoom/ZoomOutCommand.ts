import { Command } from '$lib/shortcut/Command';
import { type ZoomContext } from '$lib/space/zoom/zoomContext';

export class ZoomOutCommand extends Command {
	execute(contexts: { zoomContext: ZoomContext }): void {
		contexts.zoomContext.zoom -= 1;
	}
}
