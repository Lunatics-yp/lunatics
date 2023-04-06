import {ChangeEvent, useState} from 'react';

export function useInput(initialValue: string) {
	const [value, setValue] = useState(initialValue);

	function onChange ( event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
		setValue(event.target.value);
	}

	function reset () {
		setValue(initialValue);
	}

	function nulling () {
		setValue('');
	}

	return {
		value, onChange, reset, nulling
	};

}
