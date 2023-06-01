import {SpaceModule} from './spaceModule';
import {Placement} from './placement';
import {SpaceGround} from './spaceGround';
import type {TShapesList, TCoordinates} from './typing';

export class GameBattle {

	private _playerGround: SpaceGround;
	private _playerPlacement: Placement;
	private _playerModules: SpaceModule[];

	constructor(modulesShapesList: TShapesList) {
		this._playerGround = new SpaceGround({width: 10, height: 10});
		this._playerPlacement = new Placement(this.ground, modulesShapesList);
		this._playerModules = this._playerPlacement.modules;
	}

	// public static getInstance(modulesShapesList: TShapesList): GameBattle {
	// 	if (!GameBattle.instance) {
	// 		GameBattle.instance = new GameBattle(modulesShapesList);
	// 	}
	// 	return GameBattle.instance;
	// }

	get ground(): SpaceGround {
		return this._playerGround;
	}

	get placement(): Placement {
		return this._playerPlacement;
	}

	public findSpaceModule(coordinates: TCoordinates): SpaceModule | null {
		return SpaceModule.findSpaceModule(this._playerModules, coordinates);
	}
}
