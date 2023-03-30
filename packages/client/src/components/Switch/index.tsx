import {FC, useState} from 'react';
import {SwitchProps} from './typing';
import './switch.scss';

// Компонент селектора
export const Switch: FC<SwitchProps> = (props) => {
	const {
		label = '',
		list = [],
		defaultValue = 0,
		onSwitch,
		looped = true
	} = props;
	const [selectedValue, setSelectedValue] = useState(defaultValue);

	const onSwitchHandler = (x: number) => {
		return () => {
			const maxValue = list.length - 1;
			let newValue = selectedValue + x;
			if (newValue > maxValue) {
				newValue = looped ? 0 : maxValue;
			} else if (newValue < 0) {
				newValue = looped ? 0 : 0;
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
