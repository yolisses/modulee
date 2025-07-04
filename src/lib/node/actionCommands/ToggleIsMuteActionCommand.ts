import { isMutedContextKey } from '$lib/audio/isMutedContexts';
import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/Contexts.svelte';

export class ToggleIsMuteActionCommand extends ActionCommand {
	execute(contexts: Contexts): void {
		const { isMuted } = contexts.get(isMutedContextKey);

		contexts.get(isMutedContextKey).isMuted = !isMuted;
	}
}
