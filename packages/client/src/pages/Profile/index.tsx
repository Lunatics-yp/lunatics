import {useNavigate} from 'react-router-dom';
import {Header} from 'client/src/components/Header';
import {ProfileForm} from 'client/src/forms/Profile';
import {Button} from 'client/src/components/Button';
import {PATHS} from 'client/src/routers/name';
import 'client/src/styles/form.scss';
import './profile.scss';

export const PageProfile = () => {
	const navigate = useNavigate();

	const goToMainMenu = () => {
		navigate(PATHS.mainMenu);
	};

	return (
		<div className='pageProfile'>
			<Header>Профиль игрока</Header>
			<div>
				<Button
					text='Назад'
					className='buttonBack'
					onClick={goToMainMenu}
				/>
				<ProfileForm/>
			</div>
		</div>
	);
};
