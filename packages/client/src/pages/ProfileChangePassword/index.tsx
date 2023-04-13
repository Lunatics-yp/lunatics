import {useNavigate} from 'react-router-dom';
import {Header} from 'client/src/components/Header';
import {ProfileChangePasswordForm} from 'client/src/forms/ProfileChangePassword';
import {Button} from 'client/src/components/Button';
import {PATHS} from 'client/src/routers/name';
import 'client/src/styles/form.scss';
import './profile.scss';

export const PageProfileChangePassword = () => {
	const navigate = useNavigate();

	const goToProfile = () => {
		navigate(PATHS.profile);
	};

	return (
		<div className='pageProfile'>
			<Header>Профиль: смена пароля</Header>
			<div>
				<Button
					text='Назад'
					className='buttonBack'
					onClick={goToProfile}
				/>
				<ProfileChangePasswordForm/>
			</div>
		</div>
	);
};
