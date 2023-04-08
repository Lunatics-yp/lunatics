// Импорт других компонентов
import {Header} from 'client/src/components/Header';
import {Menu} from 'client/src/components/Menu';
import {Footer} from 'client/src/components/Footer';
import {Button} from 'client/src/components/Button';
import {Switch} from 'client/src/components/Switch';
import {PlayersList} from 'client/src/components/PlayersList';
import {TPlayerData} from 'client/src/components/PlayersList/typing';
import {PATHS} from 'client/src/routers/name';
// Импорт реката
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
// Импорты внутри компонента
import styles from './playOnline.module.scss';

// Временная загрушка списка игроков в лобби
const lobbyData: TPlayerData = [
	{
		nickname: 'Aaaaa',
		winsOnline: 10,
		winsOffline: 20,
	},
	{
		nickname: 'Bbbbb',
		winsOnline: 30,
		winsOffline: 40,
	},
	{
		nickname: 'Ccccc',
		winsOnline: 50,
		winsOffline: 60,
	},
	{
		nickname: 'Bbbbb',
		winsOnline: 30,
		winsOffline: 40,
	},
	{
		nickname: 'Ccccc',
		winsOnline: 50,
		winsOffline: 60,
	},
	{
		nickname: 'Bbbbb',
		winsOnline: 30,
		winsOffline: 40,
	},
	{
		nickname: 'Ccccc',
		winsOnline: 50,
		winsOffline: 60,
	},
	{
		nickname: 'Yyyyy',
		winsOnline: 50,
		winsOffline: 60,
	},
	{
		nickname: 'Eeeee',
		winsOnline: 50,
		winsOffline: 60,
	},
];

// Компонент меню Играть Онлайн
export const MainMenuPlayOnline = () => {
	const navigate = useNavigate();
	const [mode, setMode] = useState(0);

	// Режимы игры
	const modes = [
		'Обычный',
		'Необычный',
	];
	const onModeSwitch = (i: number) => {
		setMode(i);
	};

	return (
		<>
			<Header>Играть Онлайн</Header>
			<div className={styles.content}>
				<Menu>
					<Switch
						list={modes}
						defaultValue={mode}
						label={'Режим игры'}
						onSwitch={onModeSwitch}/>
				</Menu>
				<p className={styles.label}>Выберите противника из лобби</p>
				<PlayersList data={lobbyData}/>
				<Menu>
					<Button
						text='Назад'
						onClick={() => {
							navigate(PATHS.mainMenu);
						}}/>
				</Menu>
			</div>
			<Footer>Подвал</Footer>
		</>
	);
};
