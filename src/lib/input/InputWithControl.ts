import { Input } from './input/Input.sveltesvelte';

export abstract class InputWithControl extends Input {
	getControlNodeId() {
		return this.id + '.control';
	}

	abstract getUnconnectedValue(): number;
}
