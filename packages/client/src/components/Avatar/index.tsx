import {FC} from 'react';
import {AvatarProps} from './typing';
import defaultUserPhoto from 'client/src/assets/images/defaultUserPhoto.jpg';
import './Avatar.scss';

export const Avatar: FC<AvatarProps> = ({src, alt, size = 'small'}) => {
	return (
		<div className='avatar'>
			<img
				src={src ?? defaultUserPhoto}
				alt={alt}
				className = {`${'avatar__img'} ${'avatar--'+size}`}
			/>
		</div>
	);
};
