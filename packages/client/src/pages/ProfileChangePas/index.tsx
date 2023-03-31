import {Form} from 'react-router-dom';
import {Header} from 'client/src/components/Header';
import {Button} from 'client/src/components/Button';
import {Input} from 'client/src/components/Input';
import {Footer} from 'client/src/components/Footer';
import {Avatar} from 'client/src/components/Avatar';
import {ButtonBack} from 'client/src/components/ButtonBack';
import './profile.scss';
import 'client/src/styles/form.scss';

export const PageProfileChangePas = () => {

	const buttonCallback = () => {
		console.log('Клик');
	};
	return (
		<div className='pageProfile'>
			<Header>Прифиль: смена пароля</Header>
			<div>
				<ButtonBack
					href='/profile'
					text='назад'
				/>
				<Form className="form">
					<Avatar
						size='large'
					/>
					<Input
						label='Текущий пароль'
						type='password'
					/>
					<Input
						label='Новый пароль'
						type='password'
					/>
					<div className="formGroup_btns">
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
