import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/Contexts.svelte';

export class ToggleIsSidebarVisibleActionCommand extends ActionCommand {
	execute(contexts: Contexts): void {
		contexts.isSidebarVisibleContext.isSidebarVisible =
			!contexts.isSidebarVisibleContext.isSidebarVisible;
	}
}
