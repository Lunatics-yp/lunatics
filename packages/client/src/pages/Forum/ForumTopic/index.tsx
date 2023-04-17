import {useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from 'client/src/hooks/redux';
import {forumActions, forumSelectors} from 'client/src/stores/reducers/forum/forumSlice';
import {Avatar} from 'client/src/components/Avatar';
import {Button} from 'client/src/components/Button';
import {toggleFullscreen} from 'client/src/utils/toggleFullScreen';
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
	const fullScreenBtnRef = useRef(null);

	function fullScreenHandler() {
		toggleFullscreen(fullScreenBtnRef);
	}

	function onCancelHandler() {
		setIsFocusing(false);
		newMessage.nulling();
	}

	function onFocusHandler() {
		setIsFocusing(true);
	}

	function onSubmitHandler() {
		if (newMessage.value.trim()) {
			dispatch(forumActions.addMessage(
				newMessage.value.trim(),
			));
		}
		newMessage.nulling();
	}

	const MessageElements = messages.map((message) => (
		<Message
			key={message.id}
			message={message}
		/>
	));

	return (
		<main className={styles.wrapper}>
			<div className={styles.container}
				ref={fullScreenBtnRef}
			>
				<ForumTopicHeader
					fullScreenBtnRef={fullScreenBtnRef}
					fullScreenHandler={fullScreenHandler}
				/>
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
