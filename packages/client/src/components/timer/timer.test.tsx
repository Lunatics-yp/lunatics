import '@testing-library/jest-dom';
import {act, render, RenderResult, screen} from '@testing-library/react';
import {sleepTimeout} from 'client/src/utils/testUtils';
import {Timer} from './timer';

describe('Timer', () => {

	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	test('should render', async () => {
		act(() => {
			render(<Timer isGameOver={false}/>);
		});
		const renderedTimer = screen.getByTestId('time');
		expect(renderedTimer).toBeInTheDocument();
	});

	test('should render with timer', async () => {
		act(() => {
			render(<Timer isGameOver={false}/>);
		});

		const renderedTimer = screen.getByTestId('time');

		expect(renderedTimer.innerHTML).toBe('00:00:00');

		act(() => {
			sleepTimeout(1500);
			jest.runOnlyPendingTimers();
		});

		expect(renderedTimer.innerHTML).toBe('00:00:01');

		act(() => {
			sleepTimeout(1000);
			jest.runOnlyPendingTimers();
		});

		expect(renderedTimer.innerHTML).toBe('00:00:02');
	});

	test('should stop timer after GameOver', () => {
		let renderTimer: RenderResult;

		act(() => {
			renderTimer = render(<Timer isGameOver={false}/>);
		});

		const renderedTimer = screen.getByTestId('time');

		act(() => {
			sleepTimeout(1500);
			jest.runOnlyPendingTimers();
		});

		expect(renderedTimer.innerHTML).toBe('00:00:01');

		act(() => {
			renderTimer.rerender(<Timer isGameOver={true}/>);
		});

		act(() => {
			sleepTimeout(1000);
			jest.runOnlyPendingTimers();
		});

		expect(renderedTimer.innerHTML).toBe('00:00:01');
	});

});
