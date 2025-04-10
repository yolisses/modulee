/**
 * Clean and format the name to create a base username
 */

export function cleanName(name: string): string {
	return name
		.toLowerCase()
		.replace(/\s+/g, '_') // Replace spaces with underscores
		.replace(/[^a-z0-9_]/g, '') // Remove special characters
		.replace(/_+/g, '_') // Collapse multiple underscores
		.replace(/^_|_$/g, ''); // Trim leading/trailing underscores
}
