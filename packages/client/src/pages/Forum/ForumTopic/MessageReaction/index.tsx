import {FC} from 'react';
import {Angry} from 'client/src/components/Reactions/Angry';
import {Disbelief} from 'client/src/components/Reactions/Disbelief';
import {Laughing} from 'client/src/components/Reactions/Laughing';
import {Love} from 'client/src/components/Reactions/Love';
import {Puke} from 'client/src/components/Reactions/Puke';
import {Sad} from 'client/src/components/Reactions/Sad';
import {ThumbDown} from 'client/src/components/Reactions/ThumbDown';
import {ThumbUp} from 'client/src/components/Reactions/ThumbUp';
import {REACTIONS} from 'client/src/config/constants';
import styles from './messageReacton.module.scss';
import {TMessageReactionProps} from './typing';

export const MessageReaction: FC<TMessageReactionProps> = props => {
	const {count, type, activeReaction, onReactionMessage} = props;

	function getReactionByType() {
		switch (type) {
			case REACTIONS.ANGRY:
				return <Angry/>;
			case REACTIONS.DISBELIEF:
				return <Disbelief/>;
			case REACTIONS.LAUGHING:
				return <Laughing/>;
			case REACTIONS.LOVE:
				return <Love/>;
			case REACTIONS.PUKE:
				return <Puke/>;
			case REACTIONS.SAD:
				return <Sad/>;
			case REACTIONS.THUMB_DOWN:
				return <ThumbDown/>;
			case REACTIONS.THUMB_UP:
				return <ThumbUp/>;
		}
	}
	const icon = getReactionByType();
	const isReacted = activeReaction === type;

	return (
		<div
			className={`${styles.reaction__box} ${isReacted && styles.reaction_me}`}
			onClick={() => {
				onReactionMessage(type);
			}}>
			<div className={styles.reaction__icon}>{icon}</div>
			<span className={`${styles.reaction__count} ${isReacted && styles.reaction_me}`}>
				{count}
			</span>
		</div>
	);
};
