import {useNavigate} from 'react-router-dom';
import {Formik, Form, FormikHelpers} from 'formik';
import {Button} from 'client/src/components/Button';
import {InputFormik} from 'client/src/components/InputFormik';

interface IFormValues {
	login: string;
	password: string;
}

export const LoginForm = () => {
	const navigate = useNavigate();

	const handlerBack = () => {
		navigate('/');
	};

	const handlerSubmit = (
		values: IFormValues,
		{setSubmitting}: FormikHelpers<IFormValues>
	) => {
		// @todo тестовый вариант обработки submit
		setTimeout(() => {
			alert(JSON.stringify(values, null, 2));
			setSubmitting(false);
		}, 500);
	};

	const initialValues: IFormValues = {
		login: '',
		password: ''
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handlerSubmit}
		>
			{({isSubmitting}) => (
				<Form className='form'>
					<InputFormik
						label='Логин'
						name='login'
					/>
					<InputFormik
						label='Пароль'
						name='password'
						type='password'
					/>
					<div className="formGroup_btns">
						<Button
							text='Авторизоваться'
							type='submit'
							disabled={isSubmitting}
						/>
						<Button
							text='Вернуться на главную'
							onClick={handlerBack}
						/>
					</div>

				</Form>
			)}
		</Formik>
	);
};
