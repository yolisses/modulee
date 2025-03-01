import { getZoomContext } from '$lib/ui/zoomContext';

export class ZoomOutContextualCommand {
	zoomContext = getZoomContext();

	execute() {
		this.zoomContext.zoom -= 1;
	}
}
