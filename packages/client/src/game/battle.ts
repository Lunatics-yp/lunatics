import {AI} from 'client/src/game/ai';
import type {Fn} from 'client/src/types';
import type {TModeData} from './constants/typing';
import {Placement} from './placement';
import {Shooting} from './shooting';
import {SpaceGround} from './spaceGround';
import {SpaceModule} from './spaceModule';
import type {TCoordinates, TShootRespond} from './typing';
import {CellStatus} from './typing';

export class GameBattle {

	// Сущности игрока
	private readonly _playerGround: SpaceGround; // Карта
	private readonly _playerModules: SpaceModule[]; // Лунные модули
	private readonly _playerPlacement: Placement; // Класс расстановки
	private readonly _playerShooting: Shooting; // Класс стрельбы по карте игрока

	private readonly _enemyGround: SpaceGround; // Карта врага (как её видит игрок)
	private readonly _enemyRealGround: SpaceGround; // Реальная карта врага
	private readonly _enemyPlacement: Placement; // Класс расстановки
	private readonly _enemyShooting: Shooting; // Класс стрельбы по карте врага
	private readonly _enemyAi: AI; // Класс ИИ

	private static _currentGame: GameBattle; // Для передачи между страничками

	private readonly _modulesCount: number; // Общее кол-во модулей (для подсчета победителя)

	constructor(modeData: TModeData) {
		const {map, ships} = modeData;
		this._playerGround = new SpaceGround({width: map.width, height: map.height});
		this._playerPlacement = new Placement(this.playerGround, ships);
		this._playerModules = this._playerPlacement.modules;
		this._playerShooting = new Shooting(this.playerGround, this._playerModules);
		this._modulesCount = this._playerPlacement.modules.length;

		this._enemyGround = new SpaceGround({width: map.width, height: map.height});
		this._enemyRealGround = new SpaceGround({width: map.width, height: map.height});
		this._enemyPlacement = new Placement(this._enemyRealGround, ships);
		this._enemyPlacement.randomLocateAllModulesToGround();
		this._enemyShooting = new Shooting(this._enemyRealGround, this._enemyPlacement.modules);
		this._enemyAi = new AI(this._playerShooting);

		GameBattle._currentGame = this;
	}

	get playerGround(): SpaceGround {
		return this._playerGround;
	}

	get enemyGround(): SpaceGround {
		return this._enemyGround;
	}

	get placement(): Placement {
		return this._playerPlacement;
	}

	get modulesCount(): number {
		return this._modulesCount;
	}

	static get currentGame() {
		return GameBattle._currentGame;
	}

	static set currentGame(value) {
		GameBattle._currentGame = value;
	}

	// Найти модуль игрока по координатам
	public findSpaceModule(coordinates: TCoordinates): SpaceModule | null {
		return SpaceModule.findSpaceModule(this._playerModules, coordinates);
	}

	// Вызов стрельбы ВРАГА по ИГРОКУ
	public async enemyShooting(callback: Fn<void, TShootRespond>) {
		setTimeout(async () => {
			const shootRespond = await this._enemyAi.shoot();
			callback(shootRespond);
		},1000);
	}

	// Стрельба ИГРОКА по ВРАГУ
	public async playerShooting(
		coordinates: TCoordinates,
		callback: Fn<void, TShootRespond>,
	) {
		// Стреляем по реальной карте врага
		const shootRespond = await this._enemyShooting.shoot(coordinates);
		// Смотрим ответ и отмечаем на нашей карте врага результат
		if(shootRespond.hadShoot){
			if(shootRespond.hit){
				if(shootRespond.destroyed){
					const module
						= SpaceModule.findSpaceModule(this._enemyShooting.modules, coordinates);
					if(!module){
						throw new Error('Модуль не найдет, такого быть не может)');
					}
					module.mapPosition.forEach(position => {
						this._enemyGround.setCellStatus(position, CellStatus.DESTROYED);
					});
				}else{
					this._enemyGround.setCellStatus(coordinates, CellStatus.BURNING);
				}
			}else{
				this._enemyGround.setCellStatus(coordinates, CellStatus.MISSED);
			}
		}
		callback(shootRespond);
	}

}
