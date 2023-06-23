import {useEffect} from 'react';
import {useAppDispatch} from 'client/src/hooks/redux';
import {geolocationSelectors} from 'client/src/stores/reducers/geolocation/GeolocationReducers';
import {useAppSelector} from 'client/src/hooks/redux';

interface Position {
  coords: {
    longitude: number;
  };
}

export const useGeolocation = () => {
	const dispatch = useAppDispatch();
	const geolocation = useAppSelector(geolocationSelectors.geolocation);

	useEffect(() => {
		const handleSuccess = (position: Position) => {
			const {longitude} = position.coords;
			fetch(
				// eslint-disable-next-line max-len
				`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=&longitude=${longitude}&localityLanguage=ru`,
			)
				.then(response => response.json())
				.then(data => {
					const action = {
						type: 'actionGeolocation',
						countryName: data.countryName,
						countryCode: data.countryCode,
					};
					dispatch(action);
				})
				.catch(error => console.error(error));
		};

		const handleError = (error: GeolocationPositionError) => {
			console.error(error);
		};

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
		} else {
			console.log('Геолокация не поддерживается');
		}
	}, [dispatch]);

	return geolocation;
};
