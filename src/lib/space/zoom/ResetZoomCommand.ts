import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/Contexts.svelte';

export class ResetZoomCommand extends ActionCommand {
	execute(contexts: Contexts): void {
		contexts.zoomContext.zoom = 20;
	}
}
