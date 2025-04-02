export declare global {
	interface Window {
		onGoogleSignIn: (e: { credential: string }) => void;
	}
}
