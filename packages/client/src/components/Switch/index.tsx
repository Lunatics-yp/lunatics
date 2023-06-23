import {FC, useState} from 'react';
import {Label} from 'client/src/components/Label';
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

	let newDefaultValue = null;
	if (!defaultValue && value && typeof value === 'string' && list.indexOf(value) !== -1) {
		newDefaultValue = list.indexOf(value);
	}

	const [selectedIndex, setSelectedIndex] = useState( newDefaultValue ?? defaultValue);

	const onSwitchHandler = (delta: number) => {
		return () => {
			const maxIndex = list.length - 1;
			let newIndex = selectedIndex + delta;
			if (newIndex > maxIndex) {
				newIndex = looped ? 0 : maxIndex;
			} else if (newIndex < 0) {
				newIndex = looped ? maxIndex : 0;
			}
			setSelectedIndex(newIndex);
			onSwitch(newIndex);
		};
	};

	return (
		<div className='formGroup'>
			<Label label={label}/>
			<div className='switch'>
				<div className='leftButton'
					data-testid='switch-down'
					onClick={onSwitchHandler(-1)}
				></div>
				<div className='selectedText' data-testid='switch-value'>
					{value ?? list[selectedIndex]}
				</div>
				<div className='rightButton'
					data-testid='switch-up'
					onClick={onSwitchHandler(1)}
				></div>
			</div>
		</div>
	);
};
