import {FC} from 'react';
import {useField} from 'formik';
import {Label} from 'client/src/components/Label';
import {TInputFormikProps} from './typing';
// Импортируем из компонента Input
import 'client/src/components/Input/input.scss';

// Компонент Input (внутри Formik)
export const InputFormik: FC<TInputFormikProps> = (props) => {
	const {
		label = '',
		type = 'text',
	} = props;

	const [field, meta] = useField(props);

	const fieldError = meta.touched && meta.error ? meta.error : null;

	return (
		<div className={`formGroup ${fieldError && 'hasError'}`}>
			<Label label={label}/>
			<div className='input'>
				<input
					type={type}
					{...field}
				/>
				<div className='underLine'></div>
			</div>
			{fieldError && (
				<div className='formError'>{fieldError}</div>
			)}
		</div>
	);
};
