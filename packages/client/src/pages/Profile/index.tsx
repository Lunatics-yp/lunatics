import {Form, useNavigate} from 'react-router-dom';
import {Header} from 'client/src/components/Header';
import {Button} from 'client/src/components/Button';
import {Input} from 'client/src/components/Input';
import {Avatar} from 'client/src/components/Avatar';
import {useState} from 'react';
import profile from 'client/src/api/profile';
import 'client/src/styles/form.scss';
import './profile.scss';

export const PageProfile = () => {

	// const { login, email } = useSelector('из стора возьму данные пользователя')

	const [loginEmail, setLoginEmail] = useState({
		login: 'admin',
		email: 'zzz@gamil'
	});
	const navigate = useNavigate();

	const buttonCallback = () => {
		profile.changeUserForm(loginEmail);
	};

	const onAvatarChange = (file) => {
		const formData = new FormData();
		formData.append('avatar', file);
		// api call change avatar
	};

	const onChangeInputName = (value, name) => {
		setLoginEmail(_prevValues => ({..._prevValues, [name]: value}));
	};

	return (
		<div className='pageProfile'>
			<Header>Прифиль игрока</Header>
			<div></div>
			<Button
				text='назад'
				className='buttonBack'
				onClick={() => {
					navigate('/');
				}}
			/>
			<Form className="form">
				<Avatar
					size='large'
					editable
					onClick={onAvatarChange}
				/>
				<Input
					label='Логин'
					name='login'
					onChange={onChangeInputName}
				/>
				<Input
					label='E-mail'
					type='email'
					name='email'
					onChange={onChangeInputName}
				/>
				<div className='formGroup_btns'>
					<Button
						text='Смена пароля'
						onClick={() => {
							navigate('/profileChangePassword');
						}}
					/>
					<Button
						text='Сохранить'
						onClick={buttonCallback}
					/>
				</div>
			</Form>
		</div>
	);
};
