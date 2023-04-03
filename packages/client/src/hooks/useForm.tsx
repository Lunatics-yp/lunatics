import {ChangeEvent, useState} from 'react';
import {Fn} from 'client/src/types';
import {REG_EMAIL, REG_LOGIN, REG_PASSWORD} from 'client/src/regExp';

function omit(obj: Record<string, string>, fields: string) {
	const result = {};
	Object.keys(obj).forEach(element => {

		if(!fields.includes(element)) {
			result[element] = obj[element];
		}
	});
	return result;
}
export const useForm = (callback: Fn<void>) => {

	const [values, setValues] = useState({});
	const [errors, setErrors] = useState({});
	const [submitError, setSubmitError] = useState('');
	const validate = ( name: string, value: string) => {

		switch (name) {
		case 'login':
			if (!REG_LOGIN.test(value)) {
				setErrors({
					...errors,
					login: ' Логин должен начинаться с буквы, может содержать ' +
						'   латинские буквы и цифры, от 3 до 32 символов'
				});
			} else {
				const newObj = omit(errors, 'login');
				setErrors(newObj);
			}
			break;

		case 'email':
			if (
				!REG_EMAIL.test(value)
			) {
				setErrors({
					...errors,
					email: 'Email введен неверно'
				});
			} else {
				const newObj = omit(errors, 'email');
				setErrors(newObj);
			}
			break;

		case 'password':
			if (
				!REG_PASSWORD.test(value)
			) {
				setErrors({
					...errors,
					password: 'Пароль должен содержать только латинские буквы, могут быть цифры,' +
						' тире и подчеркивание, минимум одна строчная и одна заглавная буква, ' +
						'минимум одна цифра, от 8 до 32 символов'
				});
			} else {
				const newObj = omit(errors, 'password');
				setErrors(newObj);
			}
			break;
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		if(submitError) {
			setSubmitError('');
		}
		const name = event.target.name;
		const val = event.target.value;

		validate( name, val);

		setValues({
			...values,
			[name]: val
		});
	};

	const handleSubmit = (event: any) => {
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
		handleChange,
		handleSubmit,
		submitError
	};
};
