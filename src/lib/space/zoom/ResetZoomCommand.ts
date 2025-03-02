import { Command } from '$lib/shortcut/Command';
import type { Contexts } from '$lib/shortcut/contexts';

export class ResetZoomCommand extends Command {
	execute(contexts: Contexts): void {
		contexts.zoomContext.zoom = 20;
	}
}
