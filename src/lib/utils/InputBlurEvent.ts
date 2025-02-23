export type InputBlurEvent = FocusEvent & {
	currentTarget: EventTarget & HTMLInputElement;
};
