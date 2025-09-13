export function setIsOverscrollEnabled(isEnabled: boolean) {
	document.getElementsByTagName('html').item(0)!.style.overscrollBehavior = isEnabled
		? 'contain'
		: '';
	document.getElementsByTagName('body').item(0)!.style.overscrollBehavior = isEnabled
		? 'contain'
		: '';
}
