import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/contexts';

export class ToggleIsLateralBarVisibleActionCommand extends ActionCommand {
	execute(contexts: Contexts): void {
		contexts.isLateralBarVisibleContext.isLateralBarVisible =
			!contexts.isLateralBarVisibleContext.isLateralBarVisible;
	}
}
