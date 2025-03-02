import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/contexts';

export class ResetZoomCommand extends ActionCommand {
	execute(contexts: Contexts): void {
		contexts.zoomContext.zoom = 20;
	}
}
