import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import {Button} from './index';

describe('Button', () => {

	test('should render', () => {
		const buttonText = 'Test Button';

		render(<Button text={buttonText}/>);

		const renderedButton = screen.getByRole('button', {name: buttonText});

		expect(renderedButton).toBeInTheDocument();
	});

	test('should call click', () => {
		const buttonText = 'Test Button';
		const handleClick = jest.fn();

		render(<Button text={buttonText} onClick={handleClick}/>);

		fireEvent.click(screen.getByRole('button', {name: buttonText}));

		expect(handleClick).toBeCalledTimes(1);
	});

});
