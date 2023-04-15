import {SpaceModule} from './spaceModule';
import {SpaceGround} from './spaceGround';

export class GameMechanic {
	private readonly _ground: SpaceGround; // ссылка на экземпляр игрового поля
	private readonly _modules: SpaceModule[] = []; // массив лунных модулей

	constructor(spaceGround: SpaceGround, spaceModules: SpaceModule[]) {
		this._ground = spaceGround;
		this._modules = spaceModules;
	}

	// Получить массив лунных модулей
	get modules(): SpaceModule[] {
		return this._modules;
	}

	// Получить ссылку на экземпляр игрового поля
	get ground(): SpaceGround {
		return this._ground;
	}
}
