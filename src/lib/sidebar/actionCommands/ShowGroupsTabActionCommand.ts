import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/Contexts.svelte';

export class ShowGroupsTabActionCommand extends ActionCommand {
	execute(contexts: Contexts): void {
		contexts.selectedTabContext.selectedTab = 'groups';
	}
}
