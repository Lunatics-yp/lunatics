import {Form, useNavigate} from 'react-router-dom';
import {Header} from 'client/src/components/Header';
import {Button} from 'client/src/components/Button';
import {Input} from 'client/src/components/Input';
import {Footer} from 'client/src/components/Footer';
import './register.scss';
import 'client/src/styles/form.scss';

export const PageRegister = () => {
	const navigate = useNavigate();

	const buttonCallback = () => {
		console.log('Клик');
	};

	return (
		<div className='pageRegister'>
			<Header>Регистрация</Header>
			<div>
				<Form className="form">
					<Input
						label='Логин'
					/>
					<Input
						label='E-mail'
						type='email'
					/>
					<Input
						label='Пароль'
						type='password'
					/>
					<div className="formGroup_btns">
						<Button
							text='Зарегистрироваться'
							onClick={buttonCallback}
						/>
						<Button
							text='Вернуться на главную'
							onClick={() => {
								navigate('/');
							}}
						/>
					</div>
				</Form>
			</div>
			<Footer>Подвал</Footer>
		</div>
	);
};
