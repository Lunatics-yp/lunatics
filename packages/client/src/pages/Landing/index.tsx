// Импорт react
import {useNavigate} from 'react-router-dom';
import {useRef} from 'react';
import {useAuth} from 'client/src/hooks/useAuth';
// Импорт компонентов
import {PATHS} from 'client/src/routers/name';
import {Button} from 'client/src/components/Button';
import {Footer} from 'client/src/components/Footer';
import logoImage from 'client/src/assets/images/landingLogoImage.webp';
import logoText from 'client/src/assets/images/landingLogoText.webp';
import landingBackground  from 'client/src/assets/images/landingBackground.webp';
import gutHubImage from 'client/src/assets/images/github.png';
// Локальные импорты
import styles from './landing.module.scss';
import {gameDescription, gameRules} from './texts';

export const PageLanding = () => {
	const navigate = useNavigate();
	const user = useAuth();

	// Элемент для блока с правилами
	const rulesElementRef = useRef<HTMLDivElement>(null);

	const goToPlay = () => {
		navigate(user ? PATHS.mainMenu : PATHS.auth);
	};

	const goToForum = () => {
		navigate(PATHS.forum);
	};

	const goToLeaderboard = () => {
		navigate(`${PATHS.leaderboard}`);
	};

	const goToRules = () => {
		rulesElementRef.current?.scrollIntoView();
	};

	// Стили для фоновых картинок
	const pageStyles = {
		pageBackground: {
			backgroundImage: `url(${landingBackground})`,
		},
		logoImage: {
			backgroundImage: `url(${logoImage})`,
		},
		logoText: {
			backgroundImage: `url(${logoText})`,
		},
		githubImage: {
			backgroundImage: `url(${gutHubImage})`,
		},
	};

	return (
		<div className={styles.pageLanding}>
			<div
				className={styles.content}
				style={pageStyles.pageBackground}
			>
				<div className={styles.logoImage} style={pageStyles.logoImage}>
					<div className={styles.logoText} style={pageStyles.logoText}/>
				</div>
				<div className={styles.buttons}>
					<Button text='Играть' onClick={goToPlay}/>
					<Button text='Форум' onClick={goToForum}/>
					<Button text='Правила' onClick={goToRules}/>
					<Button text='Лидеры' onClick={goToLeaderboard}/>
				</div>
				<div dangerouslySetInnerHTML={{__html: gameDescription}}/>
				<div ref={rulesElementRef} dangerouslySetInnerHTML={{__html: gameRules}}/>
			</div>
			<Footer>
				<div
					className={styles.linkToGitHub}
					style={pageStyles.githubImage}
				>
					<a
						target='_blank'
						rel='noreferrer'
						href='https://github.com/Lunatics-yp/lunatics'
					>
						Репозиторий на GitHub
					</a>
				</div>
			</Footer>
		</div>
	);
};
