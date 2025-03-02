export abstract class Command<C, P> {
	constructor(
		public contexts: C,
		public params: P,
	) {}

	abstract execute(): void;
}
