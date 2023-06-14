import {useEffect} from 'react';
import {useAppDispatch} from 'client/src/hooks/redux';
import {geolocationSelectors} from 'client/src/stores/reducers/geolocation/GeolocationReducers';
import {useAppSelector} from 'client/src/hooks/redux';
import {PirateFlag} from '../images/PirateFlag';
import './Geolocation.scss';

export const Geolocation = () => {
	const dispatch = useAppDispatch();
	const geolocation = useAppSelector(geolocationSelectors.geolocation);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
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
						.catch(error => console.log(error));
				},
				error => console.log(error),
			);
		} else {
			console.log('Геолокация не поддерживается');
		}
	}, []);

	const code = geolocation.flag.toUpperCase();
	const src = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`;
	return (
		<>
			<div className="geolocation">
				<h2 className="geolocation__text">
					Cтрана: {geolocation.countryName || 'не определена'}
				</h2>
			</div>
			{geolocation.countryName ? (
				<img
					className="geolocation__flag"
					src={src}
					alt={`${geolocation.countryName} flag`}
				/>
			) : (
				<PirateFlag/>
			)}
		</>
	);
};
