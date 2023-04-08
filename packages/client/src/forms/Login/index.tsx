import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Formik, Form, FormikHelpers} from 'formik';
import {Button} from 'client/src/components/Button';
import {InputFormik} from 'client/src/components/InputFormik';
import {Alert} from 'client/src/components/Alert';
import {authAPI} from 'client/src/api/auth';
import {PATHS} from 'client/src/routers/name';

interface IFormValues {
	login: string;
	password: string;
}

export const LoginForm = () => {
	const navigate = useNavigate();

	const [formAlert, setFormAlert] = useState('');

	const handleBack = () => {
		navigate(PATHS.home);
	};

	const handleSubmit = async (
		values: IFormValues,
		{setSubmitting}: FormikHelpers<IFormValues>,
	) => {
		const data = await authAPI.login({
			login: values.login,
			password: values.password,
		});

		setFormAlert(data.reason || '');

		setSubmitting(false);

		if (typeof data.reason === 'undefined') {
			navigate(PATHS.mainMenu);
		}
	};

	const initialValues: IFormValues = {
		login: '',
		password: '',
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSubmit}
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
							text='Вернуться на главную'
							onClick={handleBack}
						/>
					</div>
				</Form>
			)}
		</Formik>
	);
};
