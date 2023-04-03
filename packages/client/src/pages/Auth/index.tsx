import {Form, useNavigate} from 'react-router-dom';
import {Header} from 'client/src/components/Header';
import {Button} from 'client/src/components/Button';
import {Input} from 'client/src/components/Input';
import {Footer} from 'client/src/components/Footer';
import './auth.scss';
import 'client/src/styles/form.scss';
import {useForm} from 'client/src/hooks/useForm';

export const PageAuth = () => {
	const navigate = useNavigate();
	//Функция, вызываемая при событии submit
	const formAuth = () => {
		console.log('Form is submitted');
		console.log('Form Values ', values);
	};
	const {onChange, values,errors, handleSubmit, submitError} = useForm(formAuth);

	const buttonBackHandler = () => {
		navigate('/');
	};

	return (
		<div className='pageAuth'>
			<Header>Авторизация</Header>
			<div>
				<Form className="form" onSubmit={handleSubmit}>
					<Input
						value={values['login'] ? values['login'] : ''}
						label='Логин'
						name ='login'
						onChange={onChange}
					/>
					{
						errors['login'] && <p className='formError'>{errors['login']}</p>
					}
					<Input
						label='Пароль'
						type='password'
						value={values['password'] ? values['password'] : ''}
						name ='password'
						onChange={onChange}
					/>
					{
						errors['password'] && <p className='formError'>{errors['password']}</p>
					}
					<div className="formGroup_btns">
						<input
							type='submit'
							className='button'
							value='Авторизоваться'/>
						{
							submitError && <p className='formError'>{submitError}</p>
						}
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
