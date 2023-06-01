import {forwardRef} from 'react';
import {useAppDispatch} from 'client/src/hooks/redux';
import {deleteReaction, setReaction} from 'client/src/stores/reducers/forum/reactionsThunks';
import {Avatar} from 'client/src/components/Avatar';
import {REACTIONS} from 'client/src/config/constants';
import {Stars} from 'client/src/components/images/Stars';
import {MessageReaction} from '../MessageReaction';
import {ReactionsList} from '../ReactionsList';
import styles from './Message.module.scss';
import {TMessageProps} from './typing';

export const Message =  forwardRef<HTMLDivElement, TMessageProps>(
	function  Message (props, ref) {
		const {message, isReactionListActive, setIsReactionListActive} = props;
		const {isOwner, text, reactions} = message;
		const dispatch = useAppDispatch();

		const reactionsElements = reactions.map((reaction) => (
			<MessageReaction
				key={reaction.reactionId}
				count={reaction.count}
				type={reaction.reactionId}
				activeReaction={message.activeReaction}
				onReactionMessage={onReactionMessage}
			/>
		));

		function onReactionMessage(type: REACTIONS) {
			if (message.activeReaction === type) {
				dispatch(deleteReaction({message_id: message.id}));
			} else {
				dispatch(setReaction({message_id: message.id, reaction_id: type}));
			}
		}

		function toggleReactionWindow() {
			isReactionListActive !== message.id ?
				setIsReactionListActive(message.id) :
				setIsReactionListActive(null);
		}

		function onReactionFromWindow(type: REACTIONS) {
			if (message.activeReaction !== type) {
				dispatch(setReaction({message_id: message.id, reaction_id: type}));
			}
			setIsReactionListActive(null);
		}

		return (
			<div className={styles.wrapper} ref={ref}>
				{!isOwner && <Avatar size='medium'/>}
				<div className={`${styles.message} ${styles.message_text}
					${isOwner && styles.message_me}`}
				>
					<div className={styles.message__info}>
						<span className={styles.message__author}>
							{isOwner ? 'Вы' : 'Trevor'}
						</span>
						<span className={styles.message__date}>23 мар 2023 в 21:31</span>
						<span className={`${styles.message__reaction} ${styles.reaction_btn}`}
							title='Поставить реакцию'
							onClick={toggleReactionWindow}
						>
							<Stars/>
						</span>
						{isReactionListActive === message.id && (
							<ReactionsList onReact={onReactionFromWindow}/>
						)}
					</div>
					<p>{text}</p>
					<div className={styles.reaction__panel}>
						{reactionsElements}
					</div>
				</div>
			</div>
		);
	});
