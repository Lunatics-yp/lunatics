import {FC, FormEventHandler} from 'react';
import {Form, useNavigate} from 'react-router-dom';
import {Header} from 'client/src/components/Header';
import {Button} from 'client/src/components/Button';
import {Input} from 'client/src/components/Input';
import {Footer} from 'client/src/components/Footer';
import {InputsNames, useForm} from 'client/src/hooks/useForm';
import 'client/src/styles/form.scss';
import 'client/src/components/Button/button.scss';
import './register.scss';

type TRegisterPageProps = {
	onSubmit?: FormEventHandler<HTMLFormElement>;
};
export const PageRegister: FC<TRegisterPageProps> = () => {

	//Функция, вызываемая при событии submit
	const onFormRegister = () => {
		console.log('Form is submitted');
		console.log('Form Values ', values);
	};

	const navigate = useNavigate();
	const {onChange, values,errors, handleSubmit, submitError} = useForm(onFormRegister);
	return (
		<div className='pageRegister'>
			<Header>Регистрация</Header>
			<div>
				<Form className="form" onSubmit={handleSubmit}>
					<Input
						value={values['login'] ?? '' }
						label='Логин'
						name ={InputsNames.login}
						onChange={onChange}
					/>
					{
						errors['login'] && <p className='formError'>{errors['login']}</p>
					}
					<Input
						label='E-mail'
						type='email'
						value={values['email'] ?? ''}
						name ={InputsNames.email}
						onChange={onChange}
					/>
					{
						errors['email'] && <p className='formError'>{errors['email']}</p>
					}
					<Input
						label='Пароль'
						type='password'
						value={values['password'] ?? ''}
						name ={InputsNames.password}
						onChange={onChange}
					/>
					{
						errors['password'] && <p className='formError'>{errors['password']}</p>
					}
					<div className="formGroup_btns">
						<Button
							text='Зарегистрироваться'
							type='submit'
						/>
						{
							submitError && <p className='formError'>{submitError}</p>
						}
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
