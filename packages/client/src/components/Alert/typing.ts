export type TAlertType = 'error' | 'warning' | 'success';

export type TAlertProps = {
	text: string;
	type?: TAlertType;
};
