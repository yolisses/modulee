import { customAlphabet } from 'nanoid';
import { ID_VALID_CHARACTERS } from './ID_VALID_CHARACTERS';
import { SHORT_ID_LENGTH } from './SHORT_ID_LENGTH';

const generator = customAlphabet(ID_VALID_CHARACTERS);

export function createShortId() {
	return generator(SHORT_ID_LENGTH);
}
