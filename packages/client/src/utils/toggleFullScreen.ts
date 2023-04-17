import {RefObject} from 'react';

export function toggleFullscreen(ref: RefObject<HTMLElement>, keyFIsExit?: boolean) {

	const currentRef = ref.current;

	function onExitHandler(event: KeyboardEvent) {
		if (event.code == 'KeyF' && document.fullscreenElement) {
			document.exitFullscreen();
		}
	}

	if (currentRef) {
		if (document.fullscreenElement) {
			document.exitFullscreen();
			currentRef.removeEventListener('keydown', onExitHandler);
		} else {
			currentRef.requestFullscreen();
			if (keyFIsExit) {
				currentRef.addEventListener('keydown', onExitHandler);
			}
		}
		return document.fullscreenElement !== null;
	}
	
	return;
}
