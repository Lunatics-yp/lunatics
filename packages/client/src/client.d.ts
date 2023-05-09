export {};

declare const __SERVER_PORT__: number;

interface Window {
	__PRELOADED_STATE__?: Record<string, Record<string, unknown>>;
}
