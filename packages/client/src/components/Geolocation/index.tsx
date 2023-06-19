import {PirateFlag} from '../images/PirateFlag';
import {useGeolocation} from 'client/src/hooks/useGeolocation';
import './Geolocation.scss';

export const Geolocation = () => {
	const geolocation = useGeolocation();

	const code = geolocation.flag.toUpperCase();
	const src = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`;

	return (
		<>
			<div className='geolocation'>
				<h2 className='geolocation__text'>
					Cтрана: {geolocation.countryName || 'не определена'}
				</h2>
			</div>
			{geolocation.countryName ? (
				<img
					className='geolocation__flag'
					src={src}
					alt={`${geolocation.countryName} flag`}
				/>
			) : (
				<PirateFlag/>
			)}
		</>
	);
};
