import {Form, useNavigate} from 'react-router-dom';
import {Header} from 'client/src/components/Header';
import {Button} from 'client/src/components/Button';
import {Input} from 'client/src/components/Input';
import {Footer} from 'client/src/components/Footer';
import './auth.scss';
import 'client/src/styles/form.scss';

export const PageAuth = () => {
	const navigate = useNavigate();

	const buttonSubmitHandler = () => {
		console.log('Отправка формы');
	};

	const buttonBackHandler = () => {
		navigate('/');
	};

	return (
		<div className='pageAuth'>
			<Header>Авторизация</Header>
			<div>
				<Form className="form">
					<Input
						label='Логин'
					/>
					<Input
						label='Пароль'
						type='password'
					/>
					<div className="formGroup_btns">
						<Button
							text='Авторизоваться'
							onClick={buttonSubmitHandler}
						/>
						<Button
							text='Вернуться на главную'
							onClick={buttonBackHandler}
						/>
					</div>
				</Form>
			</div>
			<Footer>Подвал</Footer>
		</div>
	);
};
