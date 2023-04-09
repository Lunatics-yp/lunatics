import {PATHS} from 'client/src/routers/name';
import {Form, useNavigate} from 'react-router-dom';
import {Header} from 'client/src/components/Header';
import {Footer} from 'client/src/components/Footer';
import {Button} from 'client/src/components/Button';
import {Input} from 'client/src/components/Input';
import {InputsNames, useForm} from 'client/src/hooks/useForm';
import 'client/src/styles/form.scss';
import './auth.scss';

export const PageAuth = () => {
	const navigate = useNavigate();
	//Функция, вызываемая при событии submit
	const onFormAuth = () => {
		console.log('Form is submitted');
		console.log('Form Values ', values);
	};
	const {onChange, values, errors, handleSubmit, submitError} = useForm(onFormAuth);

	const buttonBackHandler = () => {
		navigate(PATHS.home);
	};

	return (
		<div className='pageAuth'>
			<Header>Авторизация</Header>
			<div>
				<Form className='form' onSubmit={handleSubmit}>
					<Input
						value={values['login'] ?? ''}
						label='Логин'
						name={InputsNames.login}
						onChange={onChange}
						errors={errors}
					/>
					<Input
						label='Пароль'
						type='password'
						value={values['password'] ?? ''}
						name={InputsNames.password}
						onChange={onChange}
						errors={errors}
					/>
					<div className='formGroup_btns'>
						<Button
							text='Авторизоваться'
							type='submit'
						/>
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
