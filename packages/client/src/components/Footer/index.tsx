import {FC, ReactNode} from "react";
import './footer.scss';

// Тип компонента подвал
type FooterProps = {
	children: ReactNode;
};

// Компонент подвал
export const Footer: FC<FooterProps> = ({children}) => {
	return (
		<div className="footer">{children}</div>
	);
};
