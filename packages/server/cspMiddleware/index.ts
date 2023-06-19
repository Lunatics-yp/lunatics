import {expressCspHeader, SELF, NONE, INLINE} from 'express-csp-header';
import {isDev} from '../utils/isDev';
import {BIG_DATA, FLAG_ICONS, HOT_MODULE_REPLACEMENT} from './cspConstants';

export const cspMiddleware = () => {
	return expressCspHeader({
		directives: {
			'default-src': [
				SELF,
			],
			'img-src': [
				SELF,
				FLAG_ICONS,
				'\'data:\'',
			],
			'font-src': [SELF],
			'media-src': [SELF],
			'connect-src': [
				SELF,
				BIG_DATA,
				isDev ? HOT_MODULE_REPLACEMENT : '',
			],
			'script-src': [SELF, INLINE],
			'style-src': [SELF, INLINE],
			'worker-src': [SELF],
			'frame-ancestors': [NONE],
			'form-action': [NONE],
			'object-src': [NONE],
		},
	});
};
