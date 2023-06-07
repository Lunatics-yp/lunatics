import {KeyboardEvent, useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from 'client/src/hooks/redux';
import {KEY_ENTER} from 'client/src/config/constants';
import {forumActions, forumSelectors} from 'client/src/stores/reducers/forum/forumSlice';
import {Avatar} from 'client/src/components/Avatar';
import {Button} from 'client/src/components/Button';
import {useFullscreen} from 'client/src/hooks/useFullscreen';
import {useInput} from 'client/src/hooks/useInput';
import {ForumTopicHeader} from './ForumTopicHeader/ForumTopicHeader';
import {Message} from './Message';
import {forumThunks} from 'client/src/stores/reducers/forum/forumThunks';
import styles from './ForumTopic.module.scss';

export const ForumTopic = () => {
	const [isFocusing, setIsFocusing] = useState(false);
	const [selectedParent, setSelectedParent] = useState<number | null>(null);
	const [isReactionListActive, setIsReactionListActive] = useState<number | null>(null);
	const dispatch = useAppDispatch();

	const {user} = useAppSelector(state => state.authReducer);
	const allMessages = useAppSelector(forumSelectors.messages);
	const messages = useAppSelector(forumSelectors.parentMessages);

	const messagesEndRef = useRef<null | HTMLDivElement>(null);
	const fullScreenBtnRef = useRef(null);

	const newMessage = useInput('');
	const {toggleFullscreen} = useFullscreen(fullScreenBtnRef);

	const messageContent = newMessage.value.trim();

	function fullScreenHandler() {
		toggleFullscreen();
	}

	function onCancelHandler() {
		setIsFocusing(false);
		newMessage.nulling();
	}

	function onFocusHandler() {
		setIsFocusing(true);
	}

	function onSubmitHandler() {
		if (!messageContent) return;

		newMessage.nulling();

		if (selectedParent) {
			dispatch(
				forumActions.addSubmessage({
					parent_message_id: selectedParent,
					content: messageContent,
				}),
			);
			setSelectedParent(null);
			return;
		}
		dispatch(
			forumThunks.createMessage({
				action: 'message.create',
				data: {
					topic_id: 4,
					parent_message_id: 0,
					text: messageContent,
				},
				// eslint-disable-next-line @typescript-eslint/comma-dangle
			})
		);
		//dispatch(forumActions.addMessage(messageContent));
	}

	// отправка сообщений на Enter и перенос строки на Shift + Enter
	function onPressEnter(event: KeyboardEvent) {
		if (event.key === KEY_ENTER && !event.shiftKey && messageContent) {
			event.preventDefault();
			onSubmitHandler();
		}
	}

	// плавная прокрутка, выполняемая при изменении массива сообщений
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({
			behavior: 'smooth',
		});
	}, [messages]);

	// мгновенная прокрутка, выполняемая при монтировании компонента
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({
			behavior: 'auto',
		});
	}, []);

	const MessageElements = messages.map(message => (
		<Message
			key={message.id}
			message={message}
			ref={messagesEndRef}
			messages={allMessages}
			setSelectedParent={setSelectedParent}
			isReactionListActive={isReactionListActive}
			setIsReactionListActive={setIsReactionListActive}
		/>
	));

	return (
		<main className={styles.wrapper}>
			<div className={styles.container} ref={fullScreenBtnRef}>
				<ForumTopicHeader
					fullScreenBtnRef={fullScreenBtnRef}
					fullScreenHandler={fullScreenHandler}
				/>
				<div className={styles.container__messages}>{MessageElements}</div>
				<div className={styles.footer}>
					<div className={styles.reply}>
						<div className={styles.reply__avatar}>
							<Avatar size="small" src={user?.avatar}/>
						</div>
						<div className={styles.reply__field}>
							<textarea
								onFocus={onFocusHandler}
								onChange={newMessage.onChange}
								onKeyDown={onPressEnter}
								value={newMessage.value}
								className={styles.field}
								placeholder={
									selectedParent !== null
										? 'Ответить на комментарий...'
										: 'Написать комментарий...'
								}
							/>
						</div>
					</div>
					{isFocusing && (
						<div className={styles.footer__control}>
							<div className={styles.footer__actions}>
								<Button
									text="Отмена"
									onClick={onCancelHandler}
									className={`${styles.cancel} ${styles.defaultBtn}`}
								/>
								<Button
									text="Отправить"
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
