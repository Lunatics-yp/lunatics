import {RefObject, useEffect, useState} from 'react';
import {KEY_F} from 'client/src/config/constants';

export function useFullscreen(ref?: RefObject<HTMLElement>, isKeyFFullscreenMode?: boolean) {

	const [isFullscreen, setIsFullscreen] = useState(false);
	const currentRef = ref ? ref.current : null;

	useEffect(() => {
		function onFullscreenChange() {
			setIsFullscreen(Boolean(document.fullscreenElement));
		}

		function onKeyHandler(event: KeyboardEvent) {

			if (currentRef && event.code === KEY_F) {

				if (document.fullscreenElement) {

					document.exitFullscreen();

				} else {
					currentRef.requestFullscreen();
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

		if (currentRef) {
			if (isFullscreen) {
				document.exitFullscreen();
			} else {
				currentRef.requestFullscreen();
			}
		}
	}

	return {isFullscreen, toggleFullscreen};
}
