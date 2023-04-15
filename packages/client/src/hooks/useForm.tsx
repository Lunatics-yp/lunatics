import {ChangeEvent, FormEvent, useState} from 'react';
import {Fn} from 'client/src/types';
import {REG_EMAIL, REG_LOGIN, REG_PASSWORD} from 'client/src/regExp';
import {emailError, loginError, passwordError} from 'client/src/errors/errors';
import {omit} from 'client/src/utils/omit';

export enum InputsNames {
	login = 'login',
	email = 'email',
	password = 'password',
}
export const useForm = (callback: Fn<void>) => {

	const [values, setValues] = useState<Record<string, string>>({});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [submitError, setSubmitError] = useState<string>('');
	const validate = ( name: string, value: string) => {

		switch (name) {
			case InputsNames.login :
				if (!REG_LOGIN.test(value)) {
					setErrors({
						...errors,
						login: loginError,
					});
				} else {
					const newObj = omit(errors, ['login']);
					setErrors(newObj);
				}
				break;

			case InputsNames.email:
				if (!REG_EMAIL.test(value)) {
					setErrors({
						...errors,
						email: emailError,
					});
				} else {
					const newObj = omit(errors, ['email']);
					setErrors(newObj);
				}
				break;

			case InputsNames.password:
				if (!REG_PASSWORD.test(value)) {
					setErrors({
						...errors,
						password: passwordError,
					});
				} else {
					const newObj = omit(errors, ['password']);
					setErrors(newObj);
				}
				break;
		}
	};

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		if(submitError) {
			setSubmitError('');
		}
		const {name, value} = event.target;

		validate( name, value);

		setValues({
			...values,
			[name]: value,
		});
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		if (event) event.preventDefault();
		if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
			callback();
		}
		else{
			setSubmitError('Заполните все поля формы');
		}
	};
	return {
		values,
		errors,
		onChange,
		handleSubmit,
		submitError,
	};
};
