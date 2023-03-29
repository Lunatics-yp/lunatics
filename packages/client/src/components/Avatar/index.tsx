import {FC} from 'react';
import {AvatarProps} from './typing';
import defaultUserPhoto from 'client/src/assets/images/defaultUserPhoto.jpg';
import  styles from './Avatar.module.scss';

export const Avatar: FC<AvatarProps> = ({src, largePhoto=false}) => {
	return (
		<div className={styles.avatar__wrapper}>
			<img
				src={src ?? defaultUserPhoto}
				alt="user-photo"
				className={`${styles.avatar} ${largePhoto ? `${styles.avatar_large}` : ''} `}
			/>
		</div>
	);
};
