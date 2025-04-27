import { describe, expect, it } from 'vitest';
import { getNewItemName } from './getNewItemName';

describe('getNewItemName', () => {
	it('works with custom prefix', () => {
		const items = [{ name: 'Module 1' }, { name: 'Module 3' }];
		expect(getNewItemName(items, 'Module')).toBe('Module 4');
	});

	it('returns first number with custom prefix and no matching items', () => {
		const items = [{ name: 'Other' }, { name: 'Random' }];
		expect(getNewItemName(items, 'Module')).toBe('Module 1');
	});

	it('handles single item with custom prefix', () => {
		const items = [{ name: 'Task 5' }];
		expect(getNewItemName(items, 'Task')).toBe('Task 6');
	});

	it('handles mixed items with custom prefix', () => {
		const items = [
			{ name: 'Project 1' },
			{ name: 'Task' },
			{ name: 'Project 3' },
			{ name: 'Other' },
		];
		expect(getNewItemName(items, 'Project')).toBe('Project 4');
	});
});
