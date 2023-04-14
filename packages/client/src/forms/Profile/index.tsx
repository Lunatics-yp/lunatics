import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from 'client/src/hooks/redux';
import {authSelectors} from 'client/src/stores/reducers/auth/authSlice';
import {
	changeUserAvatar,
	changeUserData,
	fetchUser,
} from 'client/src/stores/reducers/auth/authThunks';
import {TUser} from 'client/src/stores/reducers/auth/typing';
import {Formik, Form, FormikHelpers} from 'formik';
import {Alert} from 'client/src/components/Alert';
import {Avatar} from 'client/src/components/Avatar';
import {Button} from 'client/src/components/Button';
import {InputFormik} from 'client/src/components/InputFormik';
import {isErrorAPI} from 'client/src/api/request/utilits';
import {emailError, loginError} from 'client/src/errors/errors';
import {REG_EMAIL, REG_LOGIN} from 'client/src/regExp';
import {PATHS} from 'client/src/routers/name';

interface IFormValues {
	avatar?: string | null;
	login: string;
	email: string;
}

// 1 Мбайт
const MAX_SIZE = 1048576;

export const ProfileForm = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {user} = useAppSelector(authSelectors.user);

	const [formAlert, setFormAlert] = useState('');

	const goToProfileChangePassword = () => {
		navigate(PATHS.profileChangePassword);
	};

	const handleAvatarChange = async (file: File) => {
		try {
			const formData = new FormData();
			formData.append('avatar', file);
			const formDataSize = (formData?.get('avatar') as {size: number})?.size;

			if (formDataSize >= MAX_SIZE) {
				setFormAlert('Слишком большой размер загружаемого файла');
				return;
			}

			const data = await dispatch(changeUserAvatar(formData)).unwrap();

			if (isErrorAPI(data)) {
				setFormAlert(data.reason);
				return;
			}

			setFormAlert('');
			navigate(PATHS.mainMenu);
		} catch (rejectedValue) {
			console.error(rejectedValue);
		}
	};

	const handleSubmit = async (
		values: IFormValues,
		{setSubmitting}: FormikHelpers<IFormValues>,
	) => {
		try {
			// @todo проверять авторизацию через hoc и убрать дополнительное условие
			if (!user) {
				await  dispatch(fetchUser());
			}

			const userData = user as TUser;

			if (isErrorAPI(userData)) {
				setFormAlert(userData.reason);
				return;
			}

			const data = await dispatch(
				changeUserData({
					login: values.login,
					email: values.email,
					// дополняем необходимыми для API полями (из userData), которых нет в форме
					first_name: userData.firstName,
					second_name: userData.secondName,
					phone: userData.phone,
					display_name: userData.displayName || '',
				}),
			);

			setSubmitting(false);

			if (isErrorAPI(data)) {
				setFormAlert(data.reason);
				return;
			}

			setFormAlert('');
			navigate(PATHS.mainMenu);

		} catch (rejectedValue) {
			console.error(rejectedValue);
		}
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
		avatar: user?.avatar ?? null,
		login: user ? user?.login : '',
		email: user ? user?.email : '',
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
