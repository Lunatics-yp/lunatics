
import {TGeolocation} from './typing';
import {RootState} from '../../store';

const initialState: TGeolocation = {
	countryName: '',
	flag: '',
};

type TGeolocationAction = {type: string; countryName: string; countryCode: string};

export function geolocationReducer(state = initialState, action: TGeolocationAction): TGeolocation {
	if (action.type === 'actionGeolocation') {
		return {
			countryName: action.countryName,
			flag: action.countryCode,
		};
	}
	return state;
}

export const geolocationSelectors = {
	geolocation: (state: RootState)  => state.geolocationReducer,
};
