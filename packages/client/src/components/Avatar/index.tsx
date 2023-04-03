import {FC} from 'react';
import {AvatarProps} from './typing';
import defaultUserPhoto from 'client/src/assets/images/defaultUserPhoto.jpg';
import './Avatar.scss';

export const Avatar: FC<AvatarProps> = ({
	src,
	alt = '',
	size = 'small',
	editable = false
}) => {

	const className = `avatar__img avatar--${size}`;

	return (
		<label className='avatar'>
			<img
				src={src ?? defaultUserPhoto}
				alt={alt}
				className={className}
			/>

			{editable && <input type='file' className='avatar__input' />}
		</label>

	);
};
