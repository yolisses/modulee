export class Loader<T> {
	listEnd?: HTMLElement;
	gotError = $state(false);
	finished = $state(false);
	isLoading = $state(false);
	items = $state.raw<T[]>();
	isIntersecting = $state(true);
	cursor = $state<string | null>();

	constructor(public getPath: (loader: Loader<T>) => string) {}

	async load() {
		const path = this.getPath(this);
		const res = await fetch(path, { method: 'GET' });

		if (!res.ok) {
			this.gotError = true;
			return;
		}

		const data = await res.json();
		this.cursor = data.nextCursor;

		if (this.cursor === null) {
			this.finished = true;
		}

		if (!this.items) {
			this.items = [];
		}
		this.items?.push(...data.items);
	}

	onChange = async () => {
		if (this.isIntersecting && !this.gotError && !this.isLoading && !this.finished) {
			this.isLoading = true;
			await this.load();
			this.isLoading = false;
		}
	};

	initialize = () => {
		if (!this.listEnd) {
			throw new Error('initialize called before listEnd is defined');
		}
		const observer = new IntersectionObserver(
			(entries) => {
				this.isIntersecting = false;
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						this.isIntersecting = true;
					}
				});
			},
			{ rootMargin: '0px 0px 100px 0px' },
		);
		observer.observe(this.listEnd);
		return () => observer.disconnect();
	};

	resetState = () => {
		this.gotError = false;
		this.finished = false;
		this.isLoading = false;
		this.cursor = undefined;
		this.isIntersecting = true;
		this.items = undefined;
	};

	handleSubmit = (e: Event) => {
		e.preventDefault();
		this.resetState();
	};

	handleReset = () => {
		this.resetState();
	};
}
