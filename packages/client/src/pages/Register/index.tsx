import {Header} from 'client/src/components/Header';
import {Footer} from 'client/src/components/Footer';
import {RegisterForm} from 'client/src/forms/Register';
import 'client/src/styles/form.scss';
import './register.scss';

export const PageRegister = () => {
	return (
		<div className='pageRegister'>
			<Header>Регистрация</Header>
			<div>
				<RegisterForm/>
			</div>
			<Footer>Подвал</Footer>
		</div>
	);
};
