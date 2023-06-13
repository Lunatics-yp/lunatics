import {FC, useEffect, useState} from 'react';
import {TGeolocationrProps} from './typing';
import './Geolocation.scss';

export const Geolocation: FC<TGeolocationrProps> = () => {
	const [country, setCountry] = useState('');
	const [flagUrl, setFlagUrl] = useState('');

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
				<h2 className="geolocationText">Регион: {country}</h2>
			</div>
			{flagUrl && <img className="flag" src={flagUrl} alt={`${country} flag`}/>}
		</>
	);
};
