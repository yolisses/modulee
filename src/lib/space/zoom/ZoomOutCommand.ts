import { ActionCommand } from '$lib/shortcut/ActionCommand';
import { type ZoomContext } from '$lib/space/zoom/zoomContext';

export class ZoomOutCommand extends ActionCommand {
	execute(contexts: { zoomContext: ZoomContext }): void {
		contexts.zoomContext.zoom -= 1;
	}
}
