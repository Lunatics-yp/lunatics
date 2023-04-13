import React, {FC} from 'react';
import {API_CONFIG} from 'client/src/config/api';
import {TAvatarProps} from './typing';
import defaultUserPhoto from 'client/src/assets/images/defaultUserPhoto.jpg';
import './Avatar.scss';

export const Avatar: FC<TAvatarProps> = (props) => {
	const {
		src = null,
		alt = '',
		size = 'small',
		editable = false,
		onChange,
	} = props;

	const className = `avatar__img avatar--${size}`;

	const imgSrc = src ? `${API_CONFIG.resources}${src}` : defaultUserPhoto;

	function forAvatar(e: React.ChangeEvent<HTMLInputElement>) {
		if(e.target.files) {
			const fileChange: File = e.target.files[0];
			if (onChange !== undefined) {
				onChange(fileChange);
			}
		}
	}

	return (
		<label className='avatar'>
			<img
				src={imgSrc}
				alt={alt}
				className={className}
			/>

			{editable && <input
				type='file'
				className='avatar__input'
				onChange={forAvatar}
			/>}
		</label>

	);
};
