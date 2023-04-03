import {Form, useNavigate} from 'react-router-dom';
import {Header} from 'client/src/components/Header';
import {Button} from 'client/src/components/Button';
import {Input} from 'client/src/components/Input';
import {Avatar} from 'client/src/components/Avatar';
import 'client/src/styles/form.scss';
import './profile.scss';

export const PageProfileChangePassword = () => {

	const navigate = useNavigate();
	const buttonCallback = () => {
		console.log('Клик');
	};
	return (
		<div className='pageProfile'>
			<Header>Прифиль: смена пароля</Header>
			<div>
				<Button
					text='назад'
					className='buttonBack'
					onClick={() => {
						navigate('/profile');
					}}
				/>

				<Form className="form">
					<Avatar
						size='large'
					/>
					<Input
						label='Текущий пароль'
						type='password'
						value='gfhjkm'
					/>
					<Input
						label='Новый пароль'
						type='password'
					/>
					<div className='formGroup_btns'>
						<Button
							text='Сохранить'
							onClick={buttonCallback}
						/>
					</div>
				</Form>
			</div>
		</div>
	);
};
