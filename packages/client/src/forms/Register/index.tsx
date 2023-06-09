import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Formik, Form, FormikHelpers} from 'formik';
import {Button} from 'client/src/components/Button';
import {InputFormik} from 'client/src/components/InputFormik';
import {Alert} from 'client/src/components/Alert';
import {authAPI} from 'client/src/api/auth';
import {isErrorAPI} from 'client/src/api/request/utilits';
import {PATHS} from 'client/src/routers/name';
import {emailError, loginError, passwordError} from 'client/src/errors/errors';
import {REG_EMAIL, REG_LOGIN, REG_PASSWORD} from 'client/src/regExp';

interface IFormValues {
	login: string;
	email: string;
	password: string;
}

export const RegisterForm = () => {
	const navigate = useNavigate();

	const [formAlert, setFormAlert] = useState('');

	const goToHome = () => {
		navigate(PATHS.home);
	};

	const goToAuth = () => {
		navigate(PATHS.auth);
	};

	const handleSubmit = async (
		values: IFormValues,
		{setSubmitting}: FormikHelpers<IFormValues>,
	) => {
		const data = await authAPI.register({
			login: values.login,
			email: values.email,
			password: values.password,
			// Дополняем обязательными фейковыми данными (для выполнения условий API)
			first_name: '',
			second_name: '',
			phone: '79120000000',
		});

		setSubmitting(false);

		if (isErrorAPI(data)) {
			setFormAlert(data.reason);
			return;
		}

		setFormAlert('');
		navigate(PATHS.mainMenu);
	};

	const handleValidate = (values: IFormValues) => {
		const errors: Partial<IFormValues> = {};
		if (!REG_LOGIN.test(values.login)) {
			errors.login = loginError;
		}
		if (!REG_PASSWORD.test(values.password)) {
			errors.password = passwordError;
		}
		if (!REG_EMAIL.test(values.email)) {
			errors.email = emailError;
		}
		return errors;
	};

	const initialValues: IFormValues = {
		login: '',
		email: '',
		password: '',
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSubmit}
			validate={handleValidate}
		>
			{({isSubmitting}) => (
				<Form className='form'>
					<Alert text={formAlert}/>
					<InputFormik
						label='Логин'
						name='login'
					/>
					<InputFormik
						label='E-mail'
						name='email'
						type='email'
					/>
					<InputFormik
						label='Пароль'
						name='password'
						type='password'
					/>
					<div className='formGroup_btns'>
						<Button
							text='Зарегистрироваться'
							type='submit'
							disabled={isSubmitting}
						/>
						<Button
							text='У меня есть аккаунт'
							onClick={goToAuth}
						/>
						<Button
							text='Вернуться на главную'
							onClick={goToHome}
						/>
					</div>
				</Form>
			)}
		</Formik>
	);
};
