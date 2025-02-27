export type InputChangeEvent = Event & {
	currentTarget: EventTarget & HTMLInputElement;
};
