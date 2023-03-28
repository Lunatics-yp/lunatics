import {FC, useState} from "react";
import './switchButton.scss';
import {Fn} from "../../types";

// Тип компонента селектора
type SwitchButtonType = {
	// Список значений
	list: string[],
	// Индекс дефолтного значения
	defaultValue?: number,
	// Заголовок для селектора
	label?: string,
	// Метод, вызываемый при изменении значения селектора
	callback?: Fn<void, number>
};

// Компонент селектора
export const SwitchButton: FC<SwitchButtonType> = (props) => {
	const {
		label = '',
		list = [],
		defaultValue = 0,
		callback = undefined
	} = props;
	const [selectedValue, setSelectedValue] = useState(defaultValue);

	const switchHandler = (x: number) => {
		return () => {
			const maxValue = list.length - 1;
			let newValue = selectedValue + x;
			if (newValue > maxValue) {
				newValue = 0;
			} else if (newValue < 0) {
				newValue = maxValue;
			}
			setSelectedValue(newValue);
			if (callback) {
				callback(newValue);
			}
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
		<div className="switchButton">
			{labelRender()}
			<div className="switchElements">
				<div className="leftButton" onClick={switchHandler(-1)}></div>
				<div className="selectedText">{list[selectedValue]}</div>
				<div className="rightButton" onClick={switchHandler(1)}></div>
			</div>
		</div>
	);
};
