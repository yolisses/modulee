import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/contexts';

export class ToggleIsMuteActionCommand extends ActionCommand {
	execute(contexts: Contexts): void {
		const { isMuted } = contexts.isMutedContext;

		contexts.isMutedContext.isMuted = !isMuted;
	}
}
