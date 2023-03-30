// Импорт других компонентов
import {Header} from 'client/src/components/Header';
import {Menu} from 'client/src/components/Menu';
import {Footer} from 'client/src/components/Footer';
import {Button} from 'client/src/components/Button';
import {Switch} from 'client/src/components/Switch';
// Импорт реката
import {useNavigate} from 'react-router-dom';
import {FC, useState} from 'react';
// Импорты внутри компонента
import {subMenuType} from '../../index';

// Компонент меню Играть против ИИ
export const MainMenuPlayOffline: FC<subMenuType> = ({parentUrl}) => {
	const navigate = useNavigate();
	const [difficulty, setDifficulty] = useState(1);
	const [mode, setMode] = useState(0);

	// Сложность
	const difficulties = [
		'Лёгкий',
		'Средний',
		'Сложный'
	];
	const onDifficultySwitch = (i: number) => {
		setDifficulty(i);
	};

	// Режимы
	const modes = [
		'Обычный',
		'Необычный'
	];
	const onModeSwitch = (i: number) => {
		setMode(i);
	};

	// Временный каллбек для нерабочих кнопок
	const callbackNull = () => {
		console.log('Клик по кнопке');
	};

	return (
		<>
			<Header>Играть против ИИ</Header>
			<Menu>
				<Switch
					list={difficulties}
					defaultValue={difficulty}
					label={'Уровень сложности'}
					onSwitch={onDifficultySwitch} />
				<Switch
					list={modes}
					defaultValue={mode}
					label={'Режим игры'}
					onSwitch={onModeSwitch}/>
				<Button
					text="Начать игру"
					onClick={callbackNull}/>
				<Button
					text="Назад"
					onClick={() => {
						navigate(parentUrl);
					}}/>
			</Menu>
			<Footer>Подвал</Footer>
		</>
	);
};
