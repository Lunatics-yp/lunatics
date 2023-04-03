import {useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {PATHS} from 'client/src/routers/name';
import {Avatar} from 'client/src/components/Avatar';
import {Button} from 'client/src/components/Button';
import {useInput} from 'client/src/hooks/useInput';
import {Message} from './Message';
import styles from './ForumTopic.module.scss';

const dataMock = [
	{id: 1, isOwner: true, text: 'Хей! Привет, мы рады попрепетвовать тебя на нашем форуме!'},
	{id: 2, isOwner: false, text: 'Как ты прошел этот непроходимый уровень?'}
];
type TDataMock = {id: number; isOwner: boolean; text: string};

export const ForumTopic = () => {
	const topicName = useParams().topicTitle;
	const [isFocusing, setIsfocusing] = useState(false);
	const [messages, setMessages] = useState(dataMock);
	const newMessage = useInput('');

	function onCancelHandler() {
		setIsfocusing(false);
		newMessage.reset();
	}

	function onFocusHandler() {
		setIsfocusing(true);
	}

	function onSubmitHandler() {
		if (newMessage.value) {
			setMessages(prev => [ ...prev, {
				id: prev[prev.length-1].id + 1,
				isOwner: true,
				text: newMessage.value
			}]);

			newMessage.reset();
		}
	}

	const MessageElements = messages.map((message: TDataMock) => (
		<Message
			key={message.id}
			message={message}
		/>
	));

	return (
		<main className={styles.wrapper}>
			<div className={styles.container}>
				<header className={styles.header}>
					<div className={styles.header__left}>
						<Link to={PATHS.forum}>
							<h2 className={styles.title}>Форумы</h2>
						</Link>
						<span className={styles.arrow}>{'>'}</span>
						<Link to={PATHS.topic}>
							<h2 className={styles.title}>Темы</h2>
						</Link>
						<span className={styles.arrow}>{'>'}</span>
						<h2 className={styles.title_color}>{topicName}</h2>
					</div>
					<div className={styles.header__right}>
						<Button
							text='Редактировать тему'
							onClick={()=>{console.log('Открытие модального окна');}}
						/>
					</div>
				</header>
				<div className={styles.container__messages}>
					{MessageElements}
				</div>
				<div className={styles.footer}>
					<div className={styles.reply}>
						<div className={styles.reply__avatar}>
							<Avatar size='small'/>
						</div>
						<div className={styles.reply__field}>
							<textarea
								onFocus={onFocusHandler}
								onChange={newMessage.onChange}
								value={newMessage.value}
								className={styles.field}
								placeholder='Написать комментарий...'
							/>
						</div>
					</div>
					{isFocusing && (
						<div className={styles.footer__control}>
							<div className={styles.footer__actions}>
								<Button text='Отмена'  onClick={onCancelHandler}
									className={`${styles.cancel} ${styles.defaultBtn}`}
								/>
								<Button text='Отправить' onClick={onSubmitHandler}
									className={`${styles.submit} ${styles.defaultBtn}`}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</main>
	);
};
