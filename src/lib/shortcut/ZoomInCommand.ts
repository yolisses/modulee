import { type ZoomContext } from '$lib/ui/zoomContext';
import type { Command } from './command';

type Contexts = { zoomContext: ZoomContext };

export class ZoomInCommand implements Command {
	constructor(private contexts: Contexts) {}

	execute() {
		this.contexts.zoomContext.zoom += 1;
	}
}
