import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/Contexts.svelte';
import { zoomContextKey } from '$lib/space/zoom/zoomContext';

export class ZoomOutCommand extends ActionCommand {
	execute(contexts: Contexts): void {
		contexts.get(zoomContextKey).zoom -= 1;
	}
}
