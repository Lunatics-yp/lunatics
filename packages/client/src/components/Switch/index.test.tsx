import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import {Switch} from './index';

let switchValues: string[];
let handleSwitch: jest.Mock;
describe('Switch', () => {

	beforeEach(async () => {
		switchValues = ['one', 'two', 'three'];
		handleSwitch = jest.fn();
	});

	test('should render', () => {
		render(<Switch list={switchValues} onSwitch={handleSwitch}/>);

		const renderedSwitch = screen.getByText('one');

		expect(renderedSwitch).toBeInTheDocument();
	});

	test('should 2 call switch up', () => {
		const renderedSwitch = render(<Switch list={switchValues} onSwitch={handleSwitch}/>);
		const renderedValue = renderedSwitch.getByTestId('switch-value');

		fireEvent.click(renderedSwitch.getByTestId('switch-up'));
		fireEvent.click(renderedSwitch.getByTestId('switch-up'));

		expect(handleSwitch).toBeCalledTimes(2);
		expect(renderedValue.innerHTML).toBe('three'); // values[2]
	});

	test('should 2 call switch down', () => {
		const renderedSwitch = render(<Switch list={switchValues} onSwitch={handleSwitch}/>);
		const renderedValue = renderedSwitch.getByTestId('switch-value');

		fireEvent.click(renderedSwitch.getByTestId('switch-down'));
		fireEvent.click(renderedSwitch.getByTestId('switch-down'));

		expect(handleSwitch).toBeCalledTimes(2);
		expect(renderedValue.innerHTML).toBe('two'); // values[1]
	});

});
