import {KeyboardEvent, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from 'client/src/hooks/redux';
import {forumActions, forumSelectors} from 'client/src/stores/reducers/forum/forumSlice';
import {useScroll} from 'client/src/hooks/useScroll';
import {Avatar} from 'client/src/components/Avatar';
import {Button} from 'client/src/components/Button';
import {useInput} from 'client/src/hooks/useInput';
import {ForumTopicHeader} from './ForumTopicHeader/ForumTopicHeader';
import {Message} from './Message';
import styles from './ForumTopic.module.scss';

export const ForumTopic = () => {

	const {user} = useAppSelector(state => state.authReducer);
	const [isFocusing, setIsFocusing] = useState(false);
	const newMessage = useInput('');
	const dispatch = useAppDispatch();
	const messages = useAppSelector(forumSelectors.messages);

	function onCancelHandler() {
		setIsFocusing(false);
		newMessage.nulling();
	}

	function onFocusHandler() {
		setIsFocusing(true);
	}

	const messageContent = newMessage.value.trim();
	function onSubmitHandler() {
		if (messageContent) {
			dispatch(forumActions.addMessage(
				messageContent,
			));
		}

		newMessage.nulling();
	}

	// плавная прокрутка, выполняемая при изменении массива сообщений
	const messagesEndRef = useRef(null);
	const {scrollIntoView} = useScroll(messagesEndRef, messages);
	scrollIntoView();

	// отправка сообщений на Enter
	function onPressEnter(event: KeyboardEvent) {
		if (event.key === 'Enter' && messageContent) {
			event.preventDefault();
			onSubmitHandler();
		}
	}

	const MessageElements = messages.map((message) => (
		<Message
			key={message.id}
			message={message}
			ref={messagesEndRef}
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
								onKeyDown={onPressEnter}
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
