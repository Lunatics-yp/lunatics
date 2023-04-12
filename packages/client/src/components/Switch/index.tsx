import {Label} from 'client/src/components/Label';
import {FC, useState} from 'react';
import {TSwitch} from './typing';
import './switch.scss';

// Компонент селектора
export const Switch: FC<TSwitch> = (props) => {
	const {
		label = '',
		list = [],
		defaultValue = 0,
		onSwitch,
		looped = true,
		value,
	} = props;

	const [selectedValue, setSelectedValue] = useState(defaultValue);

	const onSwitchHandler = (x: number) => {

		return () => {
			const maxValue = list.length - 1;
			let newValue = selectedValue + x;
			if (newValue > maxValue) {
				newValue = looped ? 0 : maxValue;
			} else if (newValue < 0) {
				newValue = looped ? maxValue : 0;
			}
			setSelectedValue(newValue);
			onSwitch(newValue);
		};
	};

	return (
		<div className='formGroup'>
			<Label label={label}/>
			<div className='switch'>
				<div className='leftButton' onClick={onSwitchHandler(-1)}></div>
				<div className='selectedText'>{value ?? list[selectedValue]}</div>
				<div className='rightButton' onClick={onSwitchHandler(1)}></div>
			</div>
		</div>
	);
};
