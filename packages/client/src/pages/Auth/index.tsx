import {Header} from 'client/src/components/Header';
import {Footer} from 'client/src/components/Footer';
import {AuthForm} from 'client/src/forms/Auth';
import 'client/src/styles/form.scss';
import './auth.scss';

export const PageAuth = () => {
	return (
		<div className='pageAuth'>
			<Header>Авторизация</Header>
			<div>
				<AuthForm/>
			</div>
			<Footer>Подвал</Footer>
		</div>
	);
};
