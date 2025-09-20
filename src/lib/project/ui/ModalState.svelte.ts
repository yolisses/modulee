export class ModalState {
	isOpen = $state(false);

	open = () => {
		this.isOpen = true;
	};

	close = () => {
		this.isOpen = false;
	};
}
