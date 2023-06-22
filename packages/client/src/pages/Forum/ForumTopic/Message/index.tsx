import {forwardRef} from 'react';
import {useAppDispatch, useAppSelector} from 'client/src/hooks/redux';
import moment from 'moment';
import {deleteReaction, setReaction} from 'client/src/stores/reducers/forum/reactionsThunks';
import {DATE_FORMAT, REACTIONS} from 'client/src/config/constants';
import {Avatar} from 'client/src/components/Avatar';
import {Stars} from 'client/src/components/images/Stars';
import {MessageReaction} from '../MessageReaction';
import {ReactionsList} from '../ReactionsList';
import {Submessage} from './Submessage';
import {Answer} from 'client/src/components/images/Answer';
import {TMessageProps} from './typing';
import styles from './Message.module.scss';

export const Message = forwardRef<HTMLDivElement, TMessageProps>(function Message(props, ref) {
	const {messages, setSelectedParent, message, isReactionListActive, setIsReactionListActive} =
		props;
	const {user} = useAppSelector(state => state.authReducer);
	const {text, id} = message;
	const isOwner = message.User.id === user?.id;
	const reactions = message.reactions || [];
	const dispatch = useAppDispatch();
	const childrenMassage = messages.filter(el => el.parent_message_id === id);
	const time = moment(message.created_at).format(DATE_FORMAT);

	const onNewSubmessage = () => {
		setSelectedParent(id);
	};

	const reactionsElements = reactions.map(reaction => (
		<MessageReaction
			key={reaction.reaction_id}
			count={reaction.count}
			type={reaction.reaction_id}
			activeReaction={message.user_reaction}
			onReactionMessage={onReactionMessage}
		/>
	));

	function onReactionMessage(type: REACTIONS) {
		if (message.user_reaction === type) {
			dispatch(deleteReaction({message_id: message.id}));
		} else {
			dispatch(setReaction({message_id: message.id, reaction_id: type}));
		}
	}

	function toggleReactionWindow() {
		isReactionListActive !== message.id
			? setIsReactionListActive(message.id)
			: setIsReactionListActive(null);
	}

	function onReactionFromWindow(type: REACTIONS) {
		if (message.user_reaction !== type) {
			dispatch(setReaction({message_id: message.id, reaction_id: type}));
		}
		setIsReactionListActive(null);
	}

	return (
		<div className={styles.wrapper} ref={ref}>
			{!isOwner && <Avatar size='medium' src={message.User.avatar}/>}
			<div className={`${styles.message} ${styles.message_text}
				${isOwner && styles.message_me}`}
			>
				<div className={styles.message__info}>
					<span className={styles.message__author}>
						{message.User.display_name}
					</span>
					<span className={styles.message__date}>{time}</span>
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
				<button
					className={styles.message__dell}
					onClick={onNewSubmessage}>
					<Answer/>
				</button>
				<div className={styles.reaction__panel}>
					{reactionsElements}
				</div>
				<div className={styles.message__sub}>
					{childrenMassage.map(submessage => (
						<Submessage key={submessage.id} message={submessage}/>
					))}
				</div>
			</div>
		</div>
	);
});
