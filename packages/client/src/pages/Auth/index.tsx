import {Header} from 'client/src/components/Header';
import {Footer} from 'client/src/components/Footer';
import {LoginForm} from 'client/src/forms/Login';
import 'client/src/styles/form.scss';
import './auth.scss';

export const PageAuth = () => {
	return (
		<div className='pageAuth'>
			<Header>Авторизация</Header>
			<div>
				<LoginForm />
			</div>
			<Footer>Подвал</Footer>
		</div>
	);
};
