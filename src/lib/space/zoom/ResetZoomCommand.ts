import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/Contexts.svelte';
import { zoomContextKey } from './zoomContext';

export class ResetZoomCommand extends ActionCommand {
	execute(contexts: Contexts): void {
		contexts.get(zoomContextKey).zoom = 20;
	}
}
