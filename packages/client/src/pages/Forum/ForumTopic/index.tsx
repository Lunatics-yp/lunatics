import {useState} from 'react';
import {useAppSelector} from 'client/src/hooks/redux';
import {Avatar} from 'client/src/components/Avatar';
import {Button} from 'client/src/components/Button';
import {useInput} from 'client/src/hooks/useInput';
import {ForumTopicHeader} from './ForumTopicHeader/ForumTopicHeader';
import {Message} from './Message';
import styles from './ForumTopic.module.scss';

const dataMock = [
	{id: 1, isOwner: true, text: 'Хей! Привет, мы рады поприветствовать тебя на нашем форуме!'},
	{id: 2, isOwner: false, text: 'Как ты прошел этот непроходимый уровень?'},
];
type TDataMock = {
	id: number;
	isOwner: boolean;
	text: string;
};

export const ForumTopic = () => {
	const {user} = useAppSelector(state => state.authReducer);
	const [isFocusing, setIsFocusing] = useState(false);
	const [messages, setMessages] = useState(dataMock);
	const newMessage = useInput('');

	function onCancelHandler() {
		setIsFocusing(false);
		newMessage.nulling();
	}

	function onFocusHandler() {
		setIsFocusing(true);
	}

	function onSubmitHandler() {
		if (newMessage.value) {
			setMessages(prev => [...prev, {
				id: prev[prev.length - 1].id + 1,
				isOwner: true,
				text: newMessage.value,
			}]);

			newMessage.nulling();
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
				<ForumTopicHeader/>
				<div className={styles.container__messages}>
					{MessageElements}
				</div>
				<div className={styles.footer}>
					<div className={styles.reply}>
						<div className={styles.reply__avatar}>
							<Avatar
								size='small'
								src={user?.avatar}
							/>
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
								<Button
									text='Отмена'
									onClick={onCancelHandler}
									className={`${styles.cancel} ${styles.defaultBtn}`}
								/>
								<Button
									text='Отправить'
									onClick={onSubmitHandler}
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
