import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/Contexts.svelte';

export class ShowProjectTabActionCommand extends ActionCommand {
	execute(contexts: Contexts): void {
		contexts.selectedTabContext.selectedTab = 'project';
		contexts.isSidebarVisibleContext.isSidebarVisible = true;
	}
}
