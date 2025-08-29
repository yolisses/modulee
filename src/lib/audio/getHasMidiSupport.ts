export function getHasMidiSupport() {
	if (typeof navigator.permissions === 'undefined') return false;
	if (!('requestMIDIAccess' in navigator)) return false;
	return true;
}
