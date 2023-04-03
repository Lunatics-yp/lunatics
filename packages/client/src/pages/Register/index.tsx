import {Form, useNavigate} from 'react-router-dom';
import {Header} from 'client/src/components/Header';
import {Button} from 'client/src/components/Button';
import {Input} from 'client/src/components/Input';
import {Footer} from 'client/src/components/Footer';
import './register.scss';
import 'client/src/styles/form.scss';
import 'client/src/components/Button/button.scss';
import {useForm} from 'client/src/hooks/useForm';
import {FC, FormEventHandler} from 'react';

type RegisterPageProps = {
	onSubmit?: FormEventHandler<HTMLFormElement>;
};
export const PageRegister: FC<RegisterPageProps> = () => {

	//Функция, вызываемая при событии submit
	const formRegister = () => {
		console.log('Form is submitted');
		console.log('Form Values ', values);
	};

	const navigate = useNavigate();
	const {handleChange, values,errors, handleSubmit, submitError} = useForm(formRegister);
	return (
		<div className='pageRegister'>
			<Header>Регистрация</Header>
			<div>
				<Form className="form" onSubmit={handleSubmit}>
					<Input
						value={values['login']}
						label='Логин'
						name ='login'
						handleChange={handleChange}
					/>
					{
						errors['login'] && <p className='formError'>{errors['login']}</p>
					}
					<Input
						label='E-mail'
						type='email'
						value={values['email']}
						name ='email'
						handleChange={handleChange}
					/>
					{
						errors['email'] && <p className='formError'>{errors['email']}</p>
					}
					<Input
						label='Пароль'
						type='password'
						value={values['password']}
						name ='password'
						handleChange={handleChange}
					/>
					{
						errors['password'] && <p className='formError'>{errors['password']}</p>
					}
					<div className="formGroup_btns">
						<input
							type='submit'
							className='button'
							value='Зарегистрироваться'/>
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
