export type TAvatarProps = {
	src?: string | null;
	alt?: string;
	size: 'small' | 'medium' | 'large';
	editable?: boolean;
	onChange?: (file: File) => void;
};
