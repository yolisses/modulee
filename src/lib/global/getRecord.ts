export async function getRecord(formData: Promise<FormData>) {
	return Object.fromEntries(await formData);
}
