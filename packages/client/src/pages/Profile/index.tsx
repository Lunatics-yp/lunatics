import {Form, useNavigate} from 'react-router-dom';
import {Header} from 'client/src/components/Header';
import {Button} from 'client/src/components/Button';
import {Input} from 'client/src/components/Input';
import {Footer} from 'client/src/components/Footer';
import {Avatar} from 'client/src/components/Avatar';
import {ButtonBack} from 'client/src/components/ButtonBack';
import './profile.scss';
import 'client/src/styles/form.scss';

export const PageProfile = () => {
	const navigate = useNavigate();

	const buttonCallback = () => {
		console.log('Клик');
	};
	return (
		<div className='pageProfile'>
			<Header>Прифиль игрока</Header>
			<div>
				<ButtonBack
					href='/'
					text='назад'
				/>
				<Form className="form">
					<Avatar
						size='large'
					/>
					<Input
						label='Логин'
					/>
					<Input
						label='E-mail'
						type='email'
					/>
					<div className="formGroup_btns">
						<Button
							text='Смена аватарки'
							onClick={buttonCallback}
						/>
						<Button
							text='Смена пароля'
							onClick={() => {
								navigate('/profileChangePas');
							}}
						/>
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
