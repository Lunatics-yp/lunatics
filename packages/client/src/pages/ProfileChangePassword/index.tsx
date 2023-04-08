import {useState} from 'react';
import {Form, useNavigate} from 'react-router-dom';
import {Header} from 'client/src/components/Header';
import {Button} from 'client/src/components/Button';
import {Input} from 'client/src/components/Input';
import {Avatar} from 'client/src/components/Avatar';
import {PATHS} from 'client/src/routers/name';
import {ProfileApi} from 'client/src/api/profile';
import 'client/src/styles/form.scss';
import './profile.scss';

export const PageProfileChangePassword = () => {
	const [passwords, setPasswords] = useState({
		oldPassword: '',
		newPassword: ''
	});

	const navigate = useNavigate();
	const buttonCallback = () => {
		ProfileApi.changePassword(passwords);
	};

	const onInputChange = (e: {target: {name: string; value: string}}) => {
		const {target: {name, value}} = e;
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
						navigate(`${PATHS.profile}`);
					}}
				/>

				<Form className="form">
					<Avatar
						size='large'
					/>
					<Input
						label='Текущий пароль'
						type='password'
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
