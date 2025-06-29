import { Input } from './Input.svelte';

export abstract class InputWithControl extends Input {
	getControlNodeId() {
		return this.id + '.control';
	}

	abstract getUnconnectedValue(): number;
}
