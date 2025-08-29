export async function getHasMidiPermission(): Promise<boolean> {
	const permissionStatus = await navigator.permissions.query({ name: 'midi' });
	return permissionStatus.state === 'granted';
}
