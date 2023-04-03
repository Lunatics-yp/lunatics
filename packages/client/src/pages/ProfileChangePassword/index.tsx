import {useState} from 'react';
import {Form, useNavigate} from 'react-router-dom';
import {Header} from 'client/src/components/Header';
import {Button} from 'client/src/components/Button';
import {Input} from 'client/src/components/Input';
import {Avatar} from 'client/src/components/Avatar';
import profile from 'client/src/api/profile';
import 'client/src/styles/form.scss';
import './profile.scss';

export const PageProfileChangePassword = () => {
	// const { password } = useSelector('из стора возьму данные пользователя')
	const [passwords, setPasswords] = useState({
		oldPassword: 'gfhjkm',
		newPassword: ''
	});

	const navigate = useNavigate();
	const buttonCallback = () => {
		profile.changePassword(passwords);
	};

	const onInputChange = (value, name) => {
		setPasswords(_prevValues => ({..._prevValues, [name]: value}));
	};

	console.log(passwords);

	return (
		<div className='pageProfile'>
			<Header>Прифиль: смена пароля</Header>
			<div>
				<Button
					text='назад'
					className='buttonBack'
					onClick={() => {
						navigate(-1);
					}}
				/>

				<Form className="form">
					<Avatar
						size='large'
					/>
					<Input
						label='Текущий пароль'
						type='password'
						text='gfhjkm'
						name='oldPassword'
						onChange={onInputChange}
					/>
					<Input
						label='Новый пароль'
						type='password'
						name='newPassword'
						onChange={onInputChange}
					/>
					<div className='formGroup_btns'>
						<Button
							text='Сохранить'
							onClick={buttonCallback}
						/>
					</div>
				</Form>
			</div>
		</div>
	);
};
