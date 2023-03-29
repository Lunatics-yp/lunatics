import {Header} from 'client/src/components/Header';
import {Link} from 'react-router-dom';

import './example.scss';

export const TestPage = () => {
	
	return (
		<div className="pageExample">
			<Header>Test</Header>
			<Link to="/">Переход на страницу example</Link>
		</div>
	);
};
