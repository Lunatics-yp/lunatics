import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {Alert} from './index';

describe('Alert', () => {

	test('should render', () => {
		const alertText = 'Test Alert';

		render(<Alert text={alertText}></Alert>);

		const renderedAlert = screen.getByText(alertText);

		expect(renderedAlert).toBeInTheDocument();
	});

});
