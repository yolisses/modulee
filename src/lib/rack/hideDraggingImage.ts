export function hideDraggingImage(dataTransfer: DataTransfer) {
	const invisibleElement = document.getElementById('sortable-invisible-element');
	if (!invisibleElement) return;
	dataTransfer.setDragImage(invisibleElement, 0, 0);
}
