import {useNavigate} from 'react-router-dom';
import {PATHS} from 'client/src/routers/name';
import {Button} from 'client/src/components/Button';
import './notAuthorized.scss';

export const NotAuthorizedForm = () => {
	const navigate = useNavigate();

	const goToAuth = () => {
		navigate(PATHS.auth);
	};

	return (
		<div className='formNotAuth'>
			<h2 className='formNotAuth__title'>Вы не авторизованы</h2>
			<Button
				text='На страницу авторизации'
				onClick={goToAuth}
			/>
		</div>
	);
};
