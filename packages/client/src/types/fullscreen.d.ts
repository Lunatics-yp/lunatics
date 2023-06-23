// Типы для fullScreen

type ExitFullscreen = typeof document.exitFullscreen;
type RequestFullscreen = typeof document.documentElement.requestFullscreen;

interface Document {
	webkitExitFullscreen: ExitFullscreen;
	mozCancelFullScreen: ExitFullscreen;
	msExitFullscreen: ExitFullscreen;
}

interface HTMLElement {
	webkitRequestFullscreen: RequestFullscreen;
	mozRequestFullscreen: RequestFullscreen;
	msRequestFullscreen: RequestFullscreen;
}
