import {SpaceModule} from './spaceModule';
import {SpaceGround} from './spaceGround';

export class GameMechanic {
	private readonly _moonGround: SpaceGround; // ссылка на экземпляр игрового поля
	private readonly _modules: SpaceModule[] = []; // массив лунных модулей

	constructor(moonGround: SpaceGround, lunarModules: SpaceModule[]) {
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
