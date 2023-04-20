import {RefObject, useEffect, useState} from 'react';
import {KEY_F} from 'client/src/config/constants';

export function useFullscreen() {

	const [isFullscreen, setIsFullscreen] = useState(false);

	useEffect(() => {
		function onFullscreenChange() {
			setIsFullscreen(Boolean(document.fullscreenElement));
		}

		document.addEventListener('fullscreenchange', onFullscreenChange);

		return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
	}, []);

	/**
	 * Переключение полноэкранного режима через обработчик
	 */
	function toggleFullscreen(ref: RefObject<HTMLElement>) {

		const currentRef = ref.current;

		if (currentRef) {
			if (isFullscreen) {
				document.exitFullscreen();
			} else {
				currentRef.requestFullscreen();
			}
		}
	}

	/**
	 * Добавление входа/выхода в полноэкранный режим по клавише F
	 */
	function onKeyFForFullscreen(ref: RefObject<HTMLElement>) {

		return useEffect(() => {

			const currentRef = ref.current;

			function onKeyHandler(event: KeyboardEvent) {

				if (currentRef && event.code === KEY_F) {

					if (document.fullscreenElement) {

						document.exitFullscreen();

					} else {
						currentRef.requestFullscreen();
					}
				}
			}

			document.addEventListener('keydown', onKeyHandler);

			return () => document.removeEventListener('keydown', onKeyHandler);
		}, []);
	}

	return {isFullscreen, toggleFullscreen, onKeyFForFullscreen};
}
