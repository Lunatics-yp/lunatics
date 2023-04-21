import {useEffect, RefObject} from 'react';

export function useScroll<Type>(ref: RefObject<HTMLElement>, dependencies: Array<Type>) {

	function scrollIntoView () {
		useEffect(() => {
			ref.current?.scrollIntoView({
				behavior: 'smooth',
			});
		}, [dependencies]);
	}

	return {scrollIntoView};
}
