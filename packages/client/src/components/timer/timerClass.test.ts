import {MyTimer} from './timerClass';

describe('timerClass', () => {

	test('check time()', () => {
		jest.useFakeTimers();

		const fn = jest.fn();
		const timer = new MyTimer(fn);

		setTimeout(() => {
			expect('00:00:00').toBe(timer.time);
		}, 500); // 0s

		setTimeout(() => {
			expect('00:00:01').toBe(timer.time);
		}, 1500); // 1s

		setTimeout(() => {
			expect('00:01:15').toBe(timer.time);
		}, 75*1000+500); // 1m 15s

		setTimeout(() => {
			expect('00:29:00').toBe(timer.time);
		}, 29*60*1000+500); // 29m

		setTimeout(() => {
			expect('01:01:00').toBe(timer.time);
		}, 61*60*1000+500); // 1h 1m

		jest.runOnlyPendingTimers();
		jest.useRealTimers();
	});

});
