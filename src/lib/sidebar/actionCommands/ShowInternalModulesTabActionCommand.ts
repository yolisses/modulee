import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/Contexts.svelte';

export class ShowInternalModulesTabActionCommand extends ActionCommand {
	execute(contexts: Contexts): void {
		contexts.selectedTabContext.selectedTab = 'internalModules';
		contexts.isSidebarVisibleContext.isSidebarVisible = true;
	}
}
