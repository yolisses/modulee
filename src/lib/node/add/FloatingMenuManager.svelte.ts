import { getRequiredContext } from '$lib/global/getRequiredContext';
import type { InputMouseEvent } from '$lib/utils/InputMouseEvent';
import { autoUpdate, computePosition, flip, shift } from '@floating-ui/dom';
import { getElementPosition, rootElementContextKey, Vector } from 'nodes-editor';

export class FloatingMenuManager {
	menu = $state<HTMLElement>();
	positioner = $state<HTMLElement>();
	menuClientPosition = $state<Vector>();
	rootElementContext = getRequiredContext(rootElementContextKey);

	getIsActive() {
		return !!this.menuClientPosition;
	}

	getMenuPosition() {
		if (!this.menuClientPosition) return;
		if (!this.rootElementContext.rootElement) return;
		return this.menuClientPosition.subtract(
			getElementPosition(this.rootElementContext.rootElement),
		);
	}

	closeModal = () => {
		this.menuClientPosition = undefined;
	};

	updatePosition = () => {
		if (!this.menu) return;
		if (!this.positioner) return;
		computePosition(this.positioner, this.menu, {
			placement: 'right',
			middleware: [flip(), shift()],
		}).then(({ x, y }) => {
			if (!this.menu) return;
			Object.assign(this.menu.style, { top: `${y}px`, left: `${x}px` });
		});
	};

	configureMenuPosition = () => {
		if (!this.menu) return;
		if (!this.positioner) return;
		return autoUpdate(this.positioner, this.menu, this.updatePosition);
	};

	handleWindowClick = (e: InputMouseEvent) => {
		const clickedInside = this.menu?.contains(e.target as Node);
		if (!clickedInside) {
			this.closeModal();
		}
	};
}
