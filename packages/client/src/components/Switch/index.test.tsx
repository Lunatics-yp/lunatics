import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import {Switch} from './index';

let switchValues: string[];
let lastIndex: number;
let handleSwitch: jest.Mock;

describe('Switch', () => {

	beforeEach(async () => {
		switchValues = ['one', 'two', 'three', 'four', 'five'];
		lastIndex = switchValues.length - 1;
		handleSwitch = jest.fn();
	});

	test('should render', () => {
		render(<Switch list={switchValues} onSwitch={handleSwitch}/>);

		const renderedSwitch = screen.getByText('one');

		expect(renderedSwitch).toBeInTheDocument();
	});

	test('should render with value=`two`', () => {
		// eslint-disable-next-line max-len
		const renderedSwitch = render(<Switch list={switchValues} onSwitch={handleSwitch} value={'two'}/>);
		const renderedValue = renderedSwitch.getByTestId('switch-value');

		expect(renderedValue.innerHTML).toBe('two');
	});

	test('should call switch up (with loop)', () => {
		// eslint-disable-next-line max-len
		const renderedSwitch = render(<Switch list={switchValues} defaultValue={lastIndex-1} onSwitch={handleSwitch}/>);
		const renderedValue = renderedSwitch.getByTestId('switch-value');

		fireEvent.click(renderedSwitch.getByTestId('switch-up'));
		expect(renderedValue.innerHTML).toBe(switchValues[lastIndex]);

		fireEvent.click(renderedSwitch.getByTestId('switch-up'));
		expect(renderedValue.innerHTML).toBe(switchValues[0]);

		expect(handleSwitch).toBeCalledTimes(2);
	});

	test('should call switch down (with loop)', () => {
		// eslint-disable-next-line max-len
		const renderedSwitch = render(<Switch list={switchValues} defaultValue={1} onSwitch={handleSwitch}/>);
		const renderedValue = renderedSwitch.getByTestId('switch-value');

		fireEvent.click(renderedSwitch.getByTestId('switch-down'));
		expect(renderedValue.innerHTML).toBe(switchValues[0]);

		fireEvent.click(renderedSwitch.getByTestId('switch-down'));
		expect(renderedValue.innerHTML).toBe(switchValues[lastIndex]);

		expect(handleSwitch).toBeCalledTimes(2);
	});

	test('should call switch up (without loop)', () => {
		// eslint-disable-next-line max-len
		const renderedSwitch = render(<Switch list={switchValues} defaultValue={lastIndex-1} looped={false} onSwitch={handleSwitch}/>);
		const renderedValue = renderedSwitch.getByTestId('switch-value');

		fireEvent.click(renderedSwitch.getByTestId('switch-up'));
		expect(renderedValue.innerHTML).toBe(switchValues[lastIndex]);

		fireEvent.click(renderedSwitch.getByTestId('switch-up'));
		expect(renderedValue.innerHTML).toBe(switchValues[lastIndex]);

		expect(handleSwitch).toBeCalledTimes(2);
	});

});
