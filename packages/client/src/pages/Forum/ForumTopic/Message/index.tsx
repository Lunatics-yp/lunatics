import {forwardRef, useState} from 'react';
import {useAppDispatch} from 'client/src/hooks/redux';
import {reactionsAPI} from 'client/src/api/reactions';
import {deleteReaction, setReaction} from 'client/src/stores/reducers/forum/reactionsThunks';
import {Avatar} from 'client/src/components/Avatar';
import {REACTIONS} from 'client/src/config/constants';
import {Stars} from 'client/src/components/images/Stars';
import {MessageReaction} from '../MessageReaction';
import {ReactionsList} from '../ReactionsList';
import styles from './Message.module.scss';
import {TMessageProps} from './typing';

// оставил для демонстрации, перед merge уберу
const dataMock = [
	{type: REACTIONS.PUKE, count:2, isReacted:true},
	{type: REACTIONS.ANGRY, count:8, isReacted:false},
];

export const Message =  forwardRef<HTMLDivElement, TMessageProps>(
	function  Message (props, ref) {
		const {message, isReactionListActive, setIsReactionListActive} = props;
		const {isOwner, text} = message;
		const dispatch = useAppDispatch();

		const [reactions] = useState(dataMock);

		const reactionsElements = reactions.map((reaction)=> (
			<MessageReaction
				key={reaction.type}
				count={reaction.count}
				type={reaction.type}
				isReacted={reaction.isReacted}
				activeReaction={message.activeReaction}
				onReactionMessage={onReactionMessage}
			/>
		));

		function onReactionMessage(type: REACTIONS, isReacted: boolean) {
			console.log('reacted', isReacted);
			if (message.activeReaction) {
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
			reactionsAPI.setReaction({message_id: 1, reaction_id: 1});
			if (message.activeReaction !== type) {
				dispatch(setReaction({message_id: message.id, reaction_id: type}));
			}
			setIsReactionListActive(null);

			if (!reactions.find(item => item.type === type)) {
				reactions.push({type: type, count:1, isReacted:true});
			}
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
