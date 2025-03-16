export function getIsTargetInput(e: KeyboardEvent) {
	const targetTagName = (e.target as HTMLElement).tagName;
	return targetTagName === 'INPUT' || targetTagName === 'TEXTAREA';
}
