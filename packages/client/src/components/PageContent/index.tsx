import {FC, ReactNode} from "react";
import './pageContent.scss';

// Тип компонента контент страницы
type PageContentProps = {
	// Дополнительный класс для pageContent
	className?: string
	children: ReactNode;
};

// Компонент контент страницы
export const PageContent: FC<PageContentProps> = (props) => {
	const {
		className = '',
		children
	} = props;

	const PageContentClassName = `pageContent ${className}`;

	return (
		<div className={PageContentClassName}>{children}</div>
	);
};
