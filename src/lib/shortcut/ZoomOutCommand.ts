import { type ZoomContext } from '$lib/space/zoom/zoomContext';
import type { Command } from './command';

type Contexts = { zoomContext: ZoomContext };

export class ZoomOutCommand implements Command {
	constructor(private contexts: Contexts) {}

	execute() {
		this.contexts.zoomContext.zoom -= 1;
	}
}
