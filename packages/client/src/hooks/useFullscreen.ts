import {RefObject, useEffect, useState} from 'react';
import {KEY_F} from 'client/src/config/constants';

function requestFullScreen(element: HTMLElement) {
	if(element.requestFullscreen) {
		element.requestFullscreen();
	} else if(element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	} else if(element.mozRequestFullscreen) {
		element.mozRequestFullscreen();
	} else if (element.msRequestFullscreen) {
		element.msRequestFullscreen();
	}
}

function exitFullScreen() {
	if(document.exitFullscreen) {
		document.exitFullscreen();
	} else if(document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	} else if(document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	}
}

export function useFullscreen(ref?: RefObject<HTMLElement>, isKeyFFullscreenMode?: boolean) {

	const [isFullscreen, setIsFullscreen] = useState(false);

	useEffect(() => {
		function onFullscreenChange() {
			setIsFullscreen(Boolean(document.fullscreenElement));
		}

		function onKeyHandler(event: KeyboardEvent) {
			const currentRef =  ref?.current ?? null;

			if (currentRef && event.code === KEY_F) {

				if (document.fullscreenElement) {

					exitFullScreen();

				} else {
					requestFullScreen(currentRef);
				}
			}
		}

		/**
	 	* Добавление входа/выхода в полноэкранный режим по клавише F
	 	*/
		if (isKeyFFullscreenMode) {
			document.addEventListener('keydown', onKeyHandler);
		}

		document.addEventListener('fullscreenchange', onFullscreenChange);

		return () => {
			document.removeEventListener('fullscreenchange', onFullscreenChange);
			document.removeEventListener('keydown', onKeyHandler);
		};
	}, []);

	/**
	 * Переключение полноэкранного режима через обработчик
	 */
	function toggleFullscreen() {
		const currentRef = ref?.current ?? null;

		if (currentRef) {
			if (isFullscreen) {
				exitFullScreen();
			} else {
				requestFullScreen(currentRef);
			}
		}
	}

	return {isFullscreen, toggleFullscreen};
}
