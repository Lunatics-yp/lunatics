import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Formik, Form, FormikHelpers} from 'formik';
import {Button} from 'client/src/components/Button';
import {InputFormik} from 'client/src/components/InputFormik';
import {Alert} from 'client/src/components/Alert';
import {authAPI} from 'client/src/api/auth';
import {PATHS} from 'client/src/routers/name';
import {requiredError} from 'client/src/errors/errors';
import {isErrorAPI} from 'client/src/api/request/utilits';

interface IFormValues {
	login: string;
	password: string;
}

export const AuthForm = () => {
	const navigate = useNavigate();

	const [formAlert, setFormAlert] = useState('');

	const goToHome = () => {
		navigate(PATHS.home);
	};

	const goToMainMenu = () => {
		navigate(PATHS.mainMenu);
	};

	const goToRegister = () => {
		navigate(PATHS.register);
	};

	const handleSubmit = async (
		values: IFormValues,
		{setSubmitting}: FormikHelpers<IFormValues>,
	) => {
		const data = await authAPI.login({
			login: values.login,
			password: values.password,
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
		if (!values.login) {
			errors.login = requiredError;
		}
		if (!values.password) {
			errors.password = requiredError;
		}
		return errors;
	};

	const initialValues: IFormValues = {
		login: '',
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
						label='Пароль'
						name='password'
						type='password'
					/>
					<div className='formGroup_btns'>
						<Button
							text='Авторизоваться'
							type='submit'
							disabled={isSubmitting}
						/>
						<Button
							text='Нет аккаунта?'
							onClick={goToRegister}
						/>
						<Button
							text='Играть как гость'
							onClick={goToMainMenu}
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
