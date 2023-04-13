import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Formik, Form, FormikHelpers} from 'formik';
import {Avatar} from 'client/src/components/Avatar';
import {Button} from 'client/src/components/Button';
import {InputFormik} from 'client/src/components/InputFormik';
import {Alert} from 'client/src/components/Alert';
import {PATHS} from 'client/src/routers/name';
import {isErrorAPI} from 'client/src/api/request/utilits';
import {userAPI} from 'client/src/api/user';
import {passwordError, requiredError} from 'client/src/errors/errors';
import {REG_PASSWORD} from 'client/src/regExp';

interface IFormValues {
	oldPassword: string;
	newPassword: string;
}

export const ProfileChangePasswordForm = () => {
	const navigate = useNavigate();

	const [formAlert, setFormAlert] = useState('');

	const handleSubmit = async (
		values: IFormValues,
		{setSubmitting}: FormikHelpers<IFormValues>,
	) => {
		const data = await userAPI.changePassword({
			oldPassword: values.oldPassword,
			newPassword: values.newPassword,
		});

		setSubmitting(false);

		if (isErrorAPI(data)) {
			setFormAlert(data.reason);
			return;
		}

		setFormAlert('');
		navigate(PATHS.profile);
	};

	const handleValidate = (values: IFormValues) => {
		const errors: Partial<IFormValues> = {};
		if (!values.oldPassword) {
			errors.oldPassword = requiredError;
		}
		if (!REG_PASSWORD.test(values.newPassword)) {
			errors.newPassword = passwordError;
		}
		return errors;
	};

	const initialValues: IFormValues = {
		oldPassword: '',
		newPassword: '',
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSubmit}
			validate={handleValidate}
		>
			{({isSubmitting}) => (
				<Form className='form'>
					<Avatar
						size='large'
					/>
					<Alert text={formAlert}/>
					<InputFormik
						label='Текущий пароль'
						name='oldPassword'
						type='password'
					/>
					<InputFormik
						label='Новый пароль'
						name='newPassword'
						type='password'
					/>
					<div className='formGroup_btns'>
						<Button
							text='Сохранить'
							type='submit'
							disabled={isSubmitting}
						/>
					</div>
				</Form>
			)}
		</Formik>
	);
};
