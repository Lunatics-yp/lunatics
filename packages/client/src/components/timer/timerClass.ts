import {Fn} from 'client/src/types';

export class MyTimer {
	private _seconds: number = 0;
	private _timerId: NodeJS.Timer | undefined;

	constructor(callback: Fn<void, string>) {
		this.start(callback);
	}

	start = (callback: Fn<void, string>) => {
		this._seconds = 0;
		if (this._timerId) {
			this.stop();
		}
		this._timerId = setInterval(() => {
			this._seconds += 1;
			callback(this.time);
		}, 1000);
	};

	stop = () => {
		clearInterval(this._timerId);
	};

	get time(): string {
		const hours = (Math.floor(this._seconds / 3600)).toString().padStart(2, '0');
		const minutes = (Math.floor(this._seconds / 60) % 60).toString().padStart(2, '0');
		const seconds = (this._seconds % 60).toString().padStart(2, '0');
		return `${hours}:${minutes}:${seconds}`;
	}
}
