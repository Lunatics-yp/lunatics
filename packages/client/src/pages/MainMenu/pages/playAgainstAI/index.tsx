// Импорт других компонентов
import {Header} from 'client/src/components/Header';
import {Menu} from 'client/src/components/Menu';
import {Footer} from 'client/src/components/Footer';
import {Button} from 'client/src/components/Button';
import {Switch} from 'client/src/components/Switch';
import {PATHS} from 'client/src/routers/name';
// Импорт реката
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
// Локальные импорты
import {difficulties} from './difficulties';
import {modes} from './modes';

// Компонент меню Играть против ИИ
export const MainMenuPlayAgainstAI = () => {
	const navigate = useNavigate();
	const [difficulty, setDifficulty] = useState(1);
	const [mode, setMode] = useState(0);

	// Сложность
	const onDifficultySwitch = (i: number) => {
		setDifficulty(i);
	};

	// Режимы
	const onModeSwitch = (i: number) => {
		setMode(i);
	};

	return (
		<>
			<Header>Играть против ИИ</Header>
			<Menu>
				<Switch
					list={difficulties}
					defaultValue={difficulty}
					label={'Уровень сложности'}
					onSwitch={onDifficultySwitch}/>
				<Switch
					list={modes}
					defaultValue={mode}
					label={'Режим игры'}
					onSwitch={onModeSwitch}/>
				<Button
					text='Начать игру'
					onClick={() => navigate(PATHS.placement)}/>
				<Button
					text='Назад'
					onClick={() => {
						navigate(PATHS.mainMenu);
					}}/>
			</Menu>
			<Footer>Подвал</Footer>
		</>
	);
};
