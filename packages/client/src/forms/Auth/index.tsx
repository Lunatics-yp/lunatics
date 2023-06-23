import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Formik, Form, FormikHelpers} from 'formik';
import {fetchUser, login} from 'client/src/stores/reducers/auth/authThunks';
import {useAppDispatch} from 'client/src/hooks/redux';
import {Button} from 'client/src/components/Button';
import {InputFormik} from 'client/src/components/InputFormik';
import {Alert} from 'client/src/components/Alert';
import {PATHS} from 'client/src/routers/name';
import {requiredError} from 'client/src/errors/errors';
import {isErrorAPI} from 'client/src/api/request/utilits';
import {oAuthAPI} from 'client/src/api/oAuth';
import {YandexLogo} from 'client/src/components/images/YandexLogo';

interface IFormValues {
	login: string;
	password: string;
}

export const AuthForm = () => {
	const navigate = useNavigate();

	const [formAlert, setFormAlert] = useState('');

	const dispatch = useAppDispatch();

	const goToHome = () => {
		navigate(PATHS.home);
	};

	const goToMainMenu = () => {
		navigate(PATHS.mainMenu);
	};

	const goToRegister = () => {
		navigate(PATHS.register);
	};

	const onLoginWithYandex = () => {
		oAuthAPI.loginWithOAuth();
	};

	const handleSubmit = async (
		values: IFormValues,
		{setSubmitting}: FormikHelpers<IFormValues>,
	) => {
		try {
			const data = await dispatch(login({
				login: values.login,
				password: values.password,
			})).unwrap();

			setSubmitting(false);

			// @todo проверять авторизацию через hoc и убрать дополнительное условие
			if (isErrorAPI(data) && data.reason !== 'User already in system') {
				setFormAlert(data.reason);
				return;
			}

			setFormAlert('');
			await dispatch(fetchUser());
			navigate(PATHS.mainMenu);

		} catch (rejectedValue) {
			console.error(rejectedValue);
		}
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
							text='Войти с Яндекс ID'
							logo={<YandexLogo/>}
							onClick={onLoginWithYandex}
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
