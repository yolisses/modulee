import type { Command } from '$lib/shortcut/command';
import { type ZoomContext } from '$lib/space/zoom/zoomContext';

type Contexts = { zoomContext: ZoomContext };

export class ResetZoomCommand implements Command {
	constructor(private contexts: Contexts) {}

	execute() {
		this.contexts.zoomContext.zoom = 20;
	}
}
