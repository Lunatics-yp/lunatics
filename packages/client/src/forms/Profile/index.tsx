import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Formik, Form, FormikHelpers} from 'formik';
import {Alert} from 'client/src/components/Alert';
import {Avatar} from 'client/src/components/Avatar';
import {Button} from 'client/src/components/Button';
import {InputFormik} from 'client/src/components/InputFormik';
import {isErrorAPI} from 'client/src/api/request/utilits';
import {emailError, loginError} from 'client/src/errors/errors';
import {REG_EMAIL, REG_LOGIN} from 'client/src/regExp';
import {PATHS} from 'client/src/routers/name';
import {userAPI} from 'client/src/api/user';
import {authAPI} from 'client/src/api/auth';

interface IFormValues {
	avatar: string | null;
	login: string;
	email: string;
}

export const ProfileForm = () => {
	const navigate = useNavigate();

	const [formAlert, setFormAlert] = useState('');

	const goToProfileChangePassword = () => {
		navigate(PATHS.profileChangePassword);
	};

	const handleAvatarChange = async (file: File) => {
		const formData = new FormData();
		formData.append('avatar', file);
		const data = await userAPI.changeAvatar(formData);

		if (isErrorAPI(data)) {
			setFormAlert(data.reason);
			return;
		}

		setFormAlert('');
		navigate(PATHS.mainMenu);
	};

	const handleSubmit = async (
		values: IFormValues,
		{setSubmitting}: FormikHelpers<IFormValues>,
	) => {
		// Получаем актуальные данные о пользователе
		// @todo условно актуальные данные будут хранится в store
		const userData = await authAPI.getUser();

		if (isErrorAPI(userData)) {
			setFormAlert(userData.reason);
			return;
		}

		const data = await userAPI.changeUser({
			login: values.login,
			email: values.email,
			// дополняем необходимыми для API полями (из userData), которых нет в форме
			first_name: userData.first_name,
			second_name: userData.second_name,
			phone: userData.phone,
			display_name: userData.display_name || '',
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
		if (!REG_EMAIL.test(values.email)) {
			errors.email = emailError;
		}
		return errors;
	};

	const initialValues: IFormValues = {
		// @todo нужно передавать реальные данные пользователя из store
		avatar: null,
		login: '',
		email: '',
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSubmit}
			validate={handleValidate}
		>
			{({isSubmitting, initialValues}) => (
				<Form className='form'>
					<Avatar
						src={initialValues.avatar}
						size='large'
						editable
						onChange={handleAvatarChange}
					/>
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
					<div className='formGroup_btns'>
						<Button
							text='Сохранить'
							type='submit'
							disabled={isSubmitting}
						/>
						<Button
							text='Сменить пароль'
							onClick={goToProfileChangePassword}
						/>
					</div>
				</Form>
			)}
		</Formik>
	);
};
