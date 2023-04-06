import {FieldHookConfig} from 'formik';
// Импортируем из компонента Input
import {InputType} from 'client/src/components/Input/typing';

type TInputFormikExtraProps = {
	label?: string;
	type?: InputType;
};

export type TInputFormikProps = FieldHookConfig<string> & TInputFormikExtraProps;
