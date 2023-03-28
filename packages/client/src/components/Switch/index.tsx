import {FC, useState} from 'react';
import './switch.scss';
import {Fn} from 'client/src/types';

// Тип компонента селектора
type SwitchButtonType = {
	// Список значений
	list: string[],
	// Индекс дефолтного значения
	defaultValue?: number,
	// Заголовок для селектора
	label?: string,
	// Метод, вызываемый при изменении значения селектора
	onSwitch: Fn<void, number>
};

// Компонент селектора
export const Switch: FC<SwitchButtonType> = (props) => {
	const {
		label = '',
		list = [],
		defaultValue = 0,
		onSwitch
	} = props;
	const [selectedValue, setSelectedValue] = useState(defaultValue);

	const onSwitchHandler = (x: number) => {
		return () => {
			const maxValue = list.length - 1;
			let newValue = selectedValue + x;
			if (newValue > maxValue) {
				newValue = 0;
			} else if (newValue < 0) {
				newValue = maxValue;
			}
			setSelectedValue(newValue);
			onSwitch(newValue);
		};
	};

	const labelRender = () => {
		if (label.length) {
			return <div className="label">{label}</div>;
		} else {
			return null;
		}
	};

	return (
		<div className="switch">
			{labelRender()}
			<div className="switchElements">
				<div className="leftButton" onClick={onSwitchHandler(-1)}></div>
				<div className="selectedText">{list[selectedValue]}</div>
				<div className="rightButton" onClick={onSwitchHandler(1)}></div>
			</div>
		</div>
	);
};
