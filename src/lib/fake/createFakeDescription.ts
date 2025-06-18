import { faker } from '@faker-js/faker';
import { range } from './range';

export function createFakeDescription() {
	return range(10)
		.map(() => {
			return (
				range(4)
					.map(() => faker.commerce.productDescription())
					.join('. ') + '.'
			);
		})
		.join('\n');
}
