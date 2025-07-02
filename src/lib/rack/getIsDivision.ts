import { CHAIN_DIVISION_PREFIX } from './CHAIN_DIVISION_PREFIX';

export function getIsDivision(id: string) {
	return id.startsWith(CHAIN_DIVISION_PREFIX);
}
