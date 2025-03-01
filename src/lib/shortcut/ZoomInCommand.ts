import { type ZoomContext } from '$lib/ui/zoomContext';

type Contexts = { zoomContext: ZoomContext };

export class ZoomInCommand {
	constructor(private contexts: Contexts) {}

	execute() {
		this.contexts.zoomContext.zoom += 1;
	}
}
