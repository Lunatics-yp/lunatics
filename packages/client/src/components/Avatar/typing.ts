export type TAvatarProps = {
	src?: string;
	alt?: string;
	size: 'small' | 'medium' | 'large';
	editable?: boolean;
	onChange?: (file: File) => void;
};
