import { Input } from './Input';

export abstract class InputWithControl extends Input {
	getControlNodeId() {
		return this.id + '.control';
	}

	abstract getIsAutoConnected(): boolean;
	abstract getUnconnectedValue(): number;
}
