import type { HasId } from '$lib/array/HasId';
import { ByIdBase } from './ByIdBase';

// TODO consider creating a version not related with Svelte
//
// TODO find a better name for this
export class ReactiveById<T extends HasId> extends ByIdBase<T> {
	protected content: Record<string, T> = $state({});
}
