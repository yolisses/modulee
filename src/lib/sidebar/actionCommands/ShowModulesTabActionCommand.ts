import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/Contexts.svelte';

export class ShowModulesTabActionCommand extends ActionCommand {
	execute(contexts: Contexts): void {
		contexts.selectedTabContext.selectedTab = 'modules';
		contexts.isSidebarVisibleContext.isSidebarVisible = true;
	}
}
