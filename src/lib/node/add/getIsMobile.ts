// TODO search a more robust API
export function getIsMobile() {
	return /Android|iPhone|iPad/i.test(navigator.userAgent);
}
