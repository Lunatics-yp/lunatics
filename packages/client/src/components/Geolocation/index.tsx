import {FC, useEffect, useState} from 'react';
import {PirateFlag} from '../images/PirateFlag';
import {TGeolocationrProps} from './typing';
import './Geolocation.scss';

export const Geolocation: FC<TGeolocationrProps> = ({initialRegion, initialFlagUrl}) => {
	const [country, setCountry] = useState(initialRegion || '');
	const [flagUrl, setFlagUrl] = useState(initialFlagUrl || '');

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					const {latitude, longitude} = position.coords;
					fetch(
						// eslint-disable-next-line max-len
						`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
					)
						.then(response => response.json())
						.then(data => {
							console.log(data);
							setCountry(data.continent);
							setFlagUrl(
								// eslint-disable-next-line max-len
								`https://purecatamphetamine.github.io/country-flag-icons/3x2/${data.countryCode.toUpperCase()}.svg`,
							);
						})
						.catch(error => console.log(error));
				},
				error => console.log(error),
			);
		} else {
			console.log('Геолокация не поддерживается');
		}
	}, []);

	return (
		<>
			<div className="geolocation">
				<h2 className="geolocation__text">Регион: {country || 'не определен'}</h2>
			</div>
			{flagUrl ? (
				<img className="geolocation__flag" src={flagUrl} alt={`${country} flag`}/>
			) : (
				<PirateFlag/>
			)}
		</>
	);
};
