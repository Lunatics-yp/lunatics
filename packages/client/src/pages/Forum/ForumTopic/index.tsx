import {KeyboardEvent, useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from 'client/src/hooks/redux';
import {useMessages} from 'client/src/hooks/useMessages';
import {useInput} from 'client/src/hooks/useInput';
import {useAuth} from 'client/src/hooks/useAuth';
import {useFullscreen} from 'client/src/hooks/useFullscreen';
import {KEY_ENTER} from 'client/src/config/constants';
import {forumSelectors} from 'client/src/stores/reducers/forum/forumSlice';
import {forumThunks} from 'client/src/stores/reducers/forum/forumThunks';
import {Avatar} from 'client/src/components/Avatar';
import {Button} from 'client/src/components/Button';
import {ForumTopicHeader} from './ForumTopicHeader';
import {Message} from './Message';
import styles from './ForumTopic.module.scss';

export const ForumTopic = () => {
	const {topicId = ''} = useParams();
	const [isFocusing, setIsFocusing] = useState(false);
	const [selectedParent, setSelectedParent] = useState<number | null>(null);
	const [isReactionListActive, setIsReactionListActive] = useState<number | null>(null);
	const dispatch = useAppDispatch();
	const user = useAuth();
	const allMessages = useAppSelector(forumSelectors.messages);
	const {messages} = useMessages(+topicId);
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
		setSelectedParent(null);
		newMessage.nulling();
	}

	function onFocusHandler() {
		setIsFocusing(true);
	}

	function onSubmitHandler() {
		if (!messageContent) return;

		newMessage.nulling();

		if (selectedParent) {
			if (topicId) {
				dispatch(
					forumThunks.createMessage({
						action: 'message.create',
						data: {
							topic_id: +topicId,
							parent_message_id: selectedParent,
							text: messageContent,
						},
					}),
				);
			}
		}

		if (topicId) {
			dispatch(
				forumThunks.createMessage({
					action: 'message.create',
					data: {
						topic_id: +topicId,
						parent_message_id: null,
						text: messageContent,
					},
				}),
			);
		}
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
	)) ;

	return (
		<main className={styles.wrapper}>
			<div className={styles.container} ref={fullScreenBtnRef}>
				<ForumTopicHeader
					fullScreenBtnRef={fullScreenBtnRef}
					fullScreenHandler={fullScreenHandler}
				/>
				<div className={styles.container__messages}>
					{messages.length
						? MessageElements
						: <div className={styles.textLine}>Нет сообщений</div>
					}
				</div>
				<div className={styles.footer}>
					<div className={styles.reply}>
						<div className={styles.reply__avatar}>
							<Avatar size='small' src={user?.avatar}/>
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
										? 'Ответить на сообщение...'
										: 'Написать сообщение...'
								}
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
