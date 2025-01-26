import { customAlphabet } from 'nanoid';

const generator = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');

export function createId() {
	return generator(22);
}
