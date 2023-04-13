import {LunarModule} from './lunarModule';
import {MoonGround} from './moonGround';

export class GameMechanic {
	private readonly _moonGround: MoonGround; // ссылка на экземпляр игрового поля
	private readonly _modules: LunarModule[] = []; // массив лунных модулей

	constructor(moonGround: MoonGround, lunarModules: LunarModule[]) {
		this._moonGround=moonGround;
		this._modules=lunarModules;
	}

	// Получить массив лунных модулей
	getLunarModules = () => {
		return this._modules;
	};

	// Получить ссылку на экземпляр игрового поля
	getMoonGround = () => {
		return this._moonGround;
	};
}
